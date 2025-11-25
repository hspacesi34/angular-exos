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
  public errorMessage = signal<string>('');

  constructor() {
  }

  tasksCompleted = computed(() => {
    return this.tasks().filter(t => t.status === 'complete').length;
  });

  tasksRemaining = computed(() => {
    return this.tasks().filter(t => t.status !== 'complete').length;
  });

  tasksByPriority(priority: string) {
    return computed(() => {
      return this.tasks().filter(t => 
        t.status !== 'complete' && t.priority === priority
      ).length;
    });
  }

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    this.taskService.getTasks().subscribe(data => {
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
    if (this.newTaskTitle().length > 0 && this.newTaskPriority().length > 0) {
      this.errorMessage.set('');
      const newTask: TaskCreateDto = {
        title: this.newTaskTitle(),
        status: "en cours",
        priority: this.newTaskPriority()
      }
      console.log(newTask);
  
      this.taskService.addTask(newTask).then(res => console.log(res)).catch(err => console.error(err));
      this.newTaskTitle.set("");
    } else {
      this.errorMessage.set("ENTREZ UN TITRE ET PRIORITY");
    }
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
