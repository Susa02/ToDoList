import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToDoDetails } from '../pages/todo/todo.component';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class ApiService {
//services classes are globally available
  constructor(private http:HttpClient) {}

  getTodo() {
    // alert("Hello from Services")
    return this.http.get<ToDoDetails[]>('https://jsonplaceholder.typicode.com/todos')
  }

  getNewTodo():Observable<ToDoDetails[]>{
    return this.http.get<ToDoDetails[]>('https://jsonplaceholder.typicode.com/todos')
  }
}

