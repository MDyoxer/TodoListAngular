import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';  // Importar HttpClient
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';  // Si estás usando Swal para notificaciones

@Component({
  selector: 'app-tareas',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule,HttpClientModule],
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})
export class TareasComponent implements OnInit {
  Tareas: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchTareas();
  }

  // Mostrar tareas
  fetchTareas() {
    this.http.get('http://localhost/API-TODOLIST/vertareas.php')
      .subscribe({
        next: (data: any) => {
          this.Tareas = data;  // Asigna los datos de tareas a la propiedad Tareas
        },
        error: (error) => {
          console.error('Error al obtener tareas', error);
        }
      });
  }

  // Eliminar tarea
  eliminarTarea(id: number) {
    this.http.delete(`http://localhost/API-TODOLIST/eliminartarea.php?id=${id}`)
      .subscribe({
        next: (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Tarea eliminada',
            text: 'La tarea fue eliminada correctamente.',
            confirmButtonText: 'OK'
          });
          this.fetchTareas();  
        },
        error: (error) => {
          console.error('Error al eliminar la tarea:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error al eliminar',
            text: 'Hubo un problema al eliminar la tarea. Intente nuevamente.',
            confirmButtonText: 'Entendido'
          });
        }
      });
  }
}
