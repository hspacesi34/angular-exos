import { Component, inject, signal } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/Task';
import { TaskCreateDto } from '../../models/TaskCreateDto';
import { FormsModule } from '@angular/forms';
import { NgClass } from "../../../../node_modules/@angular/common/types/_common_module-chunk";

@Component({
  selector: 'app-tp-tasks',
  imports: [FormsModule, NgClass],
  templateUrl: './tp-tasks.component.html',
  styleUrl: './tp-tasks.component.css',
})
export class TpTasksComponent {
  private taskService = inject(TaskService);
  public tasks = signal<Task[]>([]);
  public newTaskTitle = signal<string>('');
  public newTaskPriority = signal<string>('');
  public editTaskTitle = signal<string>('');
  public editTaskPriority = signal<string>('');

  constructor() {
  }

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    this.taskService.getTasks().subscribe(data => {
      // if (data.length > 0) {
      //   console.log(data);
      // }
      this.tasks.set(data);
    })
  }

  addTask() {
    const newTask: TaskCreateDto = {
      title: this.newTaskTitle(),
      status: "test",
      priority: this.newTaskPriority()
    }
    console.log(newTask);
    
    this.taskService.addTask(newTask).then(res => console.log(res)).catch(err => console.error(err));
    this.newTaskTitle.set("");
  }

  delTask(id: string) {
    this.taskService.delTask(id).then(res => console.log(res)).catch(err => console.error(err));
  }

  updateTaskTitle(title: string) {
    this.editTaskTitle.set(title);
  }

  updateTask(id: string) {
    if (this.editTaskTitle() == "") {
      console.warn("ENTREZ QQCHOSE");
    } else {
      const editTask: Task = {
        id: id,
        title: this.editTaskTitle(),
        status: "test",
        priority: this.editTaskPriority()
      }
      this.taskService.updateTask(editTask).then(res => console.log(res)).catch(err => console.error(err));
      this.editTaskTitle.set("");
    }
  }
}
