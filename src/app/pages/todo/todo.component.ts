import {SelectionModel} from '@angular/cdk/collections';
import {Component} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';

export interface ToDoDetails {
  id: number;
  title: string;
  completed: string;
}

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [MatTableModule, MatCheckboxModule, CommonModule, FormsModule, MatIconModule ],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent {
  displayedColumns: string[] = ['select', 'id', 'Title', 'Edit','Delete'];
  dataSource: MatTableDataSource<ToDoDetails>;
  selection = new SelectionModel<ToDoDetails>(true, []);
  todos: ToDoDetails[] = [];

  // constructor(public api:ApiService, private http: HttpClient){
  //   this.dataSource = new MatTableDataSource<ToDoDetails>(this.todos);
  // }
  constructor(public api:ApiService){
      this.dataSource = new MatTableDataSource<ToDoDetails>(this.todos);
     }

  ngOnInit() {
      this.getTodo();
    }
    
  getTodo(){
    this.api.getTodo()
      .subscribe(data => {
        this.todos = data;
        console.log(this.todos)
        this.dataSource.data = this.todos;
      });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: ToDoDetails): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
}

 