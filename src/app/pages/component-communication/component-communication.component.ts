import { Component, signal } from '@angular/core';
import { User } from '../../models/User';
import { ActiveUserComponent } from "../../components/active-user/active-user.component";
import { UserDataComponent } from "../../components/user-data/user-data.component";

@Component({
    selector: 'app-component-communication',
    imports: [ActiveUserComponent, UserDataComponent],
    templateUrl: './component-communication.component.html',
    styleUrl: './component-communication.component.css'
})

export class ComponentCommunicationComponent {
  public activeUser = signal<User>({nom:'', age:0});

  majUser(user: User) {
    this.activeUser.set(user);
  }
}
