import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    {path:"", component: HomeComponent},
    {path:"tp", 
        children: [
        {path:"component-communication", loadComponent:()=>import('./pages/component-communication/component-communication.component').then(m=>m.ComponentCommunicationComponent)}
    ]},
];
