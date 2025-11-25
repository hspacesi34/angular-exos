import { Component, computed, inject, signal } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/Task';
import { TaskCreateDto } from '../../models/TaskCreateDto';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

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

  tasksCompleted = computed(() => {
    return this.tasks().filter(t => t.status === 'complete').length;
  });

  tasksRemaining = computed(() => {
    return this.tasks().filter(t => t.status !== 'complete').length;
  });

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    this.taskService.getTasks().subscribe(data => {
      // if (data.length > 0) {
      //   console.log(data);
      // }
      const PriorityOrder: Record<string, number> = {
        'haute': 1,
        'moyenne': 2,
        'basse': 3,
      };
      const sortedData = data.sort((a, b) => {
        const priorityA = PriorityOrder[a.priority];
        const priorityB = PriorityOrder[b.priority];

        return priorityA - priorityB;
      });
      this.tasks.set(sortedData);
    })
  }

  addTask() {
    const newTask: TaskCreateDto = {
      title: this.newTaskTitle(),
      status: "en cours",
      priority: this.newTaskPriority()
    }
    console.log(newTask);

    this.taskService.addTask(newTask).then(res => console.log(res)).catch(err => console.error(err));
    this.newTaskTitle.set("");
  }

  delTask(id: string) {
    this.taskService.delTask(id).then(res => console.log(res)).catch(err => console.error(err));
  }

  updateTask(id: string, priority: string, title: string) {
    const editTask: Task = {
      id: id,
      title: title,
      status: "complete",
      priority: priority
    }
    this.taskService.updateTask(editTask).then(res => console.log(res)).catch(err => console.error(err));
    console.log("Tâche " + title + " complétée!");
  }
}
