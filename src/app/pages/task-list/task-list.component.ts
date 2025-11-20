import { Component, inject, model, signal } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/Task';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  imports: [FormsModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent {
  private taskService = inject(TaskService);
  public tasks = signal<Task[]>([]);
  public newTask = model<Task>({id:'', title:'', status:'test'});

  constructor() {
    this.taskService.getTasks().subscribe(data => {
      console.log(data);
      this.tasks.set(data);
    })
  }

  addTask() {
    console.log(this.newTask());
    this.taskService.addTask(this.newTask()).then(res => console.log(res)).catch(err => console.error(err));
  }
}
