import { Routes } from '@angular/router';
import { TareasComponent } from './tareas/tareas.component';
import { CrearComponent } from './crear/crear.component';

export const routes: Routes = [
    {path: 'tareas', component: TareasComponent},
    {path: 'crear', component: CrearComponent},
    { path: '', redirectTo: '/tareas', pathMatch: 'full' }, 


];
