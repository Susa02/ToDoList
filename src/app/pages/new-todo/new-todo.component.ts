import {SelectionModel} from '@angular/cdk/collections';
import {Component} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { Observable, map } from 'rxjs';

export interface ToDoDetails {
  id: number;
  title: string;
  completed: string;
}

@Component({
  selector: 'app-new-todo',
  standalone: true,
  imports: [MatTableModule, MatCheckboxModule, CommonModule, FormsModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './new-todo.component.html',
  styleUrl: './new-todo.component.scss'
})
export class NewTodoComponent {

  displayedColumns: string[] = ['select', 'id', 'Title', 'Edit','Delete'];
  dataSource= new MatTableDataSource<ToDoDetails>([]);
  selection = new SelectionModel<ToDoDetails>(true, []);
    // todos: ToDoDetails[] = [];
  todoList$!: Observable<ToDoDetails[]>
  isLoading:boolean=true
 
  constructor(public api:ApiService){
    // this.dataSource = new MatTableDataSource<ToDoDetails[]>(this.todos);
  }
  ngOnInit() {
 
    this.todoList$ = this.api.getNewTodo().pipe(
      map(todos => todos.filter(todo => !todo.completed)),
      map(todos => todos.map(todo => ({ ...todo, tile: todo.title.toUpperCase() })))
    );
    this.todoList$.subscribe((res: ToDoDetails[]) => {
      this.dataSource.data = res;
      this.isLoading = false;
      res.forEach(item => {
        if (item.completed) {
          this.selection.select(item)
        }
      })
    })
  }
 
 
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
 
 toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data.filter(row => row.completed !== 'true'));
  }
 
  checkboxLabel(row?: ToDoDetails): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
}

