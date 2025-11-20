import { Component, EventEmitter, inject, Output } from '@angular/core';
import { User } from '../../models/User';
import { FormBuilder, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-data',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './user-data.component.html',
  styleUrl: './user-data.component.css'
})
export class UserDataComponent {
  @Output() confirmSubmit = new EventEmitter<User>();
  formBuilder = inject(FormBuilder);
  public nom: string = "";
  public age: number = 0;

  userForm = this.formBuilder.group({
    nom: ['', [Validators.required, Validators.minLength(1), Validators.pattern('[a-zA-Z ]*')]],
    age: [0, [Validators.required, Validators.minLength(1)]]
  });

  ngOnInit() {
    this.userForm.reset();
  }

  submit() {
    if (this.userForm.valid) {
      const activeUser: User = {
        nom: this.userForm.value.nom!,
        age: this.userForm.value.age!
      };
      this.confirmSubmit.emit(activeUser);
      this.userForm.reset();
    }
  }
}
