import { Component, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  user: any = null;
  error: string | null = null;

  private auth: Auth = inject(Auth);

  signUp() {
    createUserWithEmailAndPassword(this.auth, this.email, this.password)
      .then((userCredential) => {
        this.user = userCredential.user;
        console.log('Utilisateur inscrit:', userCredential);
        console.log('Utilisateur inscrit:', this.user);
      })
      .catch((error) => {
        this.error = error.message;
        console.error('Erreur d\'inscription:', error);
      });
  }
}
