import { autoinject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { TodoService } from './todo-service';
import { Todo } from './todo';

@autoinject()
export class Add {
    description: string;
    priority: string;
    deadline: Date;

    constructor(private todoService: TodoService, private router: Router) {
        this.initializeProperties();
    }

    initializeProperties() {
        this.description = '';
        this.priority = 'Medium';
        this.deadline = new Date();
    }

    addTodo() {
        let todo = new Todo(this.description, this.deadline, this.priority);
        this.todoService.todos.push(todo);
        this.router.navigateToRoute('Todos');
    }
}