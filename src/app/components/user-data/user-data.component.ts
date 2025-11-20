import { Component, EventEmitter, Output } from '@angular/core';
import { User } from '../../models/User';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-data',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-data.component.html',
  styleUrl: './user-data.component.css'
})
export class UserDataComponent {
  @Output() confirmSubmit = new EventEmitter<User>();
  public nom: string = "";
  public age: number = 0;

  submit() {
    const activeUser: User = {
      nom: this.nom,
      age: this.age
    };
    this.confirmSubmit.emit(activeUser);
  }
}
