import { inject, Injectable } from '@angular/core';
import { Database, push, ref, remove, set, update } from '@angular/fire/database';
import { onValue } from '@angular/fire/database';
import { Task } from '../models/Task';
import { Observable } from 'rxjs';
import { TaskCreateDto } from '../models/TaskCreateDto';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private db = inject(Database);

  getTasks(): Observable<Task[]> {
    const tasksRef = ref(this.db, 'tasks');
    return new Observable((observer) => {
      onValue(tasksRef, (snapshot) => {
        const data = snapshot.val();
        const tasks: Task[] = data
          ? Object.keys(data).map((id) => ({ id, ...data[id] }))
          : [];
        observer.next(tasks);
      });
    });
  }

  addTask(task: TaskCreateDto): Promise<void> {
    const tasksRef = ref(this.db, 'tasks');
    const newTaskRef = push(tasksRef);
    return set(newTaskRef, task);
  }

  updateTask(task: Task): Promise<void> {
    const taskItemRef = ref(this.db, `tasks/${task.id}`);
    return update(taskItemRef, task);
  }

  delTask(id: string): Promise<void> {
    const taskItemRef = ref(this.db, `tasks/${id}`);
    return remove(taskItemRef);
  }
}
