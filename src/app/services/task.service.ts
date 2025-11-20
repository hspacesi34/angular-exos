import { inject, Injectable, signal } from '@angular/core';
import { Database, push, ref, set, update } from '@angular/fire/database';
import { onValue } from 'firebase/database';
import { Task } from '../models/Task';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private db = inject(Database);
  private tasksRef = ref(this.db, 'tasks');

  getTasks(): Observable<Task[]> {

    return new Observable<Task[]>((subscriber) => {
      onValue(this.tasksRef, (snapshot) => {
        const data = snapshot.val();
        const id = snapshot.key;
        const newData: Task = {id, ...data};
        const tasks: Task[] = newData ? Object.values(newData) : [];
        subscriber.next(tasks);
      });
    });
  }

  addTask(task: Task): Promise<void> {
    const newTaskRef = push(this.tasksRef);
    return set(newTaskRef, task);
  }

  editTask(id: string, task: Task): Promise<void> {
    const taskItemRef = ref(this.db, `tasks/${id}`);
    return update(taskItemRef, task);
  }
}
