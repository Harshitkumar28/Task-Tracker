import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { Task } from "./models/task.model";
import { TaskService } from "./services/task";

@Component({
  selector: 'app-root',
  imports: [
    FormsModule
  ],
  templateUrl: './app.html',
  styleUrl: '/app.css'
})
export class App {
  newTask = '';
  showCompletedOnly = false;

  constructor(private taskService: TaskService) {}

  get tasks(): Task[] {
    return this.taskService.getTasks();
  }

  get filteredTasks(): Task[] {
    if(this.showCompletedOnly) {
      return this.tasks.filter(
        task => task.completed === true
      );
    }
    return this.tasks;
  }

  addTask(): void {
    if(!this.newTask.trim()) return;

    this.taskService.addTask(this.newTask);
    this.newTask = '';
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id);
  }

  toggleTask(id: number): void {
    this.taskService.toggleTask(id);
  }

  get totalTask(): number {
    return this.tasks.length;
  }

  get completedTasks(): number {
    return this.tasks.filter(task => task.completed).length;
  }
}