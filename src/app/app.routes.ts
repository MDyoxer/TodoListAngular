import { Routes } from '@angular/router';
import { TareasComponent } from './tareas/tareas.component';
import { CrearComponent } from './crear/crear.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    {path: 'tareas', component: TareasComponent},
    {path: 'crear', component: CrearComponent},
    {path: 'registrate', component: SignupComponent},
    {path:  'login', component: LoginComponent},
    { path: '', redirectTo: '/login', pathMatch: 'full' }, 


];
