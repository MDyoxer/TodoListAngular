import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,HttpClientModule,CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  user = '';
  contra = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    if (!this.user || !this.contra) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor, complete todos los campos antes de continuar.',
        confirmButtonText: 'Entendido',
      });
      return;
    }

    const body = { user: this.user, contra: this.contra };
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    this.http.post('http://localhost/API-TODOLIST/login.php', body, { headers })
      .subscribe({
        next: (response: any) => {
          console.log('Login exitoso', response);
          Swal.fire({
            icon: 'success',
            title: 'Login exitoso',
            text: '¡Bienvenido!',
          });

          this.router.navigate(['/tareas']);
        },
        error: (error) => {
          console.error('Error de login:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error de login',
            text: 'Usuario o contraseña incorrectos',
          });
        }
      });
  }
}