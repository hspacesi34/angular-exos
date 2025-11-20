import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuardService } from './services/auth-guard.service';

export const routes: Routes = [
    {path:"", component: HomeComponent},
    {path:"register", component: RegisterComponent},
    {path:"login", component: LoginComponent},
    {path:"admin-dashboard", loadComponent:()=>import('./pages/admin-dashboard/admin-dashboard.component').then(m=>m.AdminDashboardComponent), canActivate: [AuthGuardService]},
    {path:"tp", 
        children: [
        {path:"component-communication", loadComponent:()=>import('./pages/component-communication/component-communication.component').then(m=>m.ComponentCommunicationComponent)}
    ]},
    {path:"exo", 
        children: [
        {path:"tasks", loadComponent:()=>import('./pages/task-list/task-list.component').then(m=>m.TaskListComponent)}
    ]},
];
