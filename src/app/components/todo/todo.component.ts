import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterType, TodoModel } from '../../models/todo';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})

export class TodoComponent {
  todolist = signal<TodoModel[]>([
    {
      id: 1,
      title: 'Task 1',
      completed: false,
      editing: false,
    },
    {
      id: 2,
      title: 'Task 2',
      completed: false,
      editing: false,
    },
    {
      id: 3,
      title: 'Task 3',
      completed: false,
      editing: false,
    },
  ]);

  filter = signal<FilterType>('all');

  newTodo = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(3)]
  })

  changeFilter(filterString: FilterType) {
    this.filter.set(filterString);
  }

  addTodo(){
    const newTodoTitle = this.newTodo.value.trim();
    if (this.newTodo.valid && newTodoTitle !== '') {
      this.todolist.update((prev_todos) => {

        return [
          ...prev_todos,
          {id: Date.now(), title: newTodoTitle, completed: false, editing: false}
        ];
      });
      this.newTodo.reset()
    } else {
      this.newTodo.reset()
    }
  }
}
