import { autoinject } from 'aurelia-framework';
import { TodoService } from './todo-service';

@autoinject()
export class Index {
    constructor(private todoService: TodoService) {
    }

    get todos() {
        return this.todoService.todos;
    }
}