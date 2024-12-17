import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,CommonModule,FormsModule,HttpClientModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  newUser={user:'',contra:''};

  constructor(private http: HttpClient, private router: Router) {}

  CrearUser(){
    if(!this.newUser.user || !this.newUser.contra){
       Swal.fire({
              icon: 'warning',
              title: 'Campos incompletos',
              text: 'Por favor, complete todos los campos antes de guardar.',
              confirmButtonText: 'Entendido'
            });
            return;
          }

    const body ={
      user: this.newUser.user,
      contra: this.newUser.contra
    }
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post('http://localhost/API-TODOLIST/crearusuario.php', body, { headers })
          .subscribe({
              //respuesta
            next: (response) => {
              console.log('Usuario creado', response);
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
                title: "El usuario se creo correctamente"
              });
              this.router.navigate(['/tareas']);
            },
            error: (error) => {
              console.error('Error al crear el usuario:', error);
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
                title: "Hubo un problema al crear el usuario. Intente nuevamente."
              });
            }
          });
      }
    }
