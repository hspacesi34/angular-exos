import { Component, Input } from '@angular/core';
import { User } from '../../models/User';

@Component({
  selector: 'app-active-user',
  standalone: true,
  imports: [],
  templateUrl: './active-user.component.html',
  styleUrl: './active-user.component.css'
})
export class ActiveUserComponent {
  @Input() activeUser: User = {nom:'',age:0};
}
