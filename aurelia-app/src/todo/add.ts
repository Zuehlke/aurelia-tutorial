import { bindable, inject, NewInstance } from 'aurelia-framework';
import { ValidationController, ValidationRules } from 'aurelia-validation';
import { Router } from 'aurelia-router';
import { TodoService } from './todo-service';
import { Todo } from './todo';

@inject(TodoService, Router, NewInstance.of(ValidationController))
export class Add {
    description: string;
    priority: string;
    deadline: Date;

    constructor(private todoService: TodoService, private router: Router, public validationController: ValidationController) {
        this.initializeProperties();
        this.initializeValidation();
    }

    initializeValidation() {
        ValidationRules.ensure((o: Add) => o.description)
            .required()
            .on(this);
    }

    initializeProperties() {
        this.description = '';
        this.priority = 'Medium';
        this.deadline = new Date();
    }

    async addTodo() {
        let validationResult = await this.validationController.validate();

        if (validationResult.valid) {
            let todo = new Todo(this.description, this.deadline, this.priority);
            this.todoService.todos.push(todo);
            this.router.navigateToRoute('Todos');
        }
    }
}
