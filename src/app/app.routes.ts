import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
    {path:"", component: HomeComponent},
    {path:"register", component: RegisterComponent},
    {path:"tp", 
        children: [
        {path:"component-communication", loadComponent:()=>import('./pages/component-communication/component-communication.component').then(m=>m.ComponentCommunicationComponent)}
    ]},
];
