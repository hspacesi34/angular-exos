import { Component, inject, signal } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-navbar',
    imports: [RouterLink],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css'
})
export class NavbarComponent {
    public auth: Auth = inject(Auth);

    constructor() {
    }

    signOut() {
        this.auth.signOut().then(res => console.log(res)).catch(err => console.error(err));
    }
}
