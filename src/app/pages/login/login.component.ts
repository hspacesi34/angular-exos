import { Component, inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { FormBuilder, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  user: any = null;
  error: string | null = null;

  private auth: Auth = inject(Auth);
  formBuilder = inject(FormBuilder);

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.minLength(1), Validators.email]],
    password: ['', [Validators.required, Validators.minLength(1)]]
  });

  signIn() {
    if (this.loginForm.valid) {
      signInWithEmailAndPassword(this.auth, this.loginForm.value.email!, this.loginForm.value.password!)
        .then((userCredential) => {
          this.user = userCredential.user;
          console.log('Utilisateur connecté:', userCredential);
          //! Redirection vers dashboard ou profil
        })
        .catch((error) => {
          this.error = error.message;
          console.error('Erreur de connexion:', error);
        });
    } else {
      this.error = "form invalid";
    }
  }

}
