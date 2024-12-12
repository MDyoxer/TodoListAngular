import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http'; // Importa HttpClient y su módulo
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink, RouterLinkActive, FormsModule, HttpClientModule], 
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent {
  newTarea = { nombre: '', descripcion: '', fecha: '' };
//crear instancia
  constructor(private http: HttpClient) {}
//verificar campos
  addTarea() {
    if (!this.newTarea.nombre || !this.newTarea.descripcion || !this.newTarea.fecha) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor, complete todos los campos antes de guardar.',
        confirmButtonText: 'Entendido'
      });
      return;
    }
    //crear objeto cuerpo
    const body = {
      nombre: this.newTarea.nombre,
      descripcion: this.newTarea.descripcion,
      fecha: this.newTarea.fecha,
      estado: 0
    };
    //cabezeras
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    //solicitud a API pasando datos y headers
    this.http.post('http://localhost/API-TODOLIST/agregartarea.php', body, { headers })
      .subscribe({
          //respuesta
        next: (response) => {
          console.log('Tarea agregada', response);
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon: "success",
            title: "La tarea se agregó correctamente"
          });
          //resetear formulario
          this.newTarea = { nombre: '', descripcion: '', fecha: '' };
        },
        error: (error) => {
          console.error('Error al agregar la tarea:', error);
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon: "error",
            title: "Hubo un problema al agregar la tarea. Intente nuevamente."
          });
        }
      });
  }
}
