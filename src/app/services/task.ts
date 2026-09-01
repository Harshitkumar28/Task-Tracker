import { Service, Injectable } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable( { providedIn: 'root' })
export class TaskService {

    private tasks: Task[] = [];

    // constructor
    constructor() {
        this.loadTasks();
    }

    private loadTasks() {
        const data = localStorage.getItem('tasks');

        if(data) {
            this.tasks = JSON.parse(data);
        }
    }

    // CRUD operation
    // Read
    getTasks(): Task[] {
        return this.tasks;
    }

    // Create
    addTask(title: string) {
        this.tasks.push({
            id: Date.now(),
            title,
            completed: false
        });

        this.saveTasks();
    }

    private saveTasks() {
        localStorage.setItem(
            'tasks',
            JSON.stringify(this.tasks)
        );
    }

    // Delete
    deleteTask(id: number) {
        this.tasks = this.tasks.filter(
            task => task.id !== id
        );
    }

    // Toggle / Update
    toggleTask(id: number) {
        const task = this.tasks.find(
            task => task.id === id
        );

        if(task) {
            task.completed = !task.completed;
            this.saveTasks();
        }
    }
}