import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoComponent } from "./pages/todo/todo.component";
import { NewTodoComponent } from "./pages/new-todo/new-todo.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, TodoComponent, NewTodoComponent]
})
export class AppComponent {
  title = 'toDOList';
}
