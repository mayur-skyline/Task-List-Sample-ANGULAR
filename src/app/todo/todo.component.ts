import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ITask } from '../model/Task';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  todoForm !: FormGroup;

  tasks: ITask [] = [];
  inprogress: ITask [] = [];
  done: ITask [] = [];
  updatedId !: any;
  isEditEnabled : boolean = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      assignby: ['', Validators.required]
    });
  }

  addTask(){
    this.tasks.push({
      title: this.todoForm.value.title,
      description: this.todoForm.value.description,
      assignby: this.todoForm.value.assignby,
      done: false
    });
    this.todoForm.reset();
  }

  updateTask(){
    this.tasks[this.updatedId].title = this.todoForm.value.title;
    this.tasks[this.updatedId].description = this.todoForm.value.description;
    this.tasks[this.updatedId].assignby = this.todoForm.value.assignby;
    this.tasks[this.updatedId].done = false;
    this.todoForm.reset();
    this.isEditEnabled = false;
    this.updatedId = null;
  }

  deleteTask(i: number){
    this.tasks.splice(i, 1);
  }

  deleteInProgressTask(i: number){
    this.inprogress.splice(i, 1);
  }

  deleteDoneTask(i: number){
    this.done.splice(i, 1);
  }

  OnEdit(item: ITask, i: number){
    this.todoForm.controls['title'].setValue(item.title);
    this.todoForm.controls['description'].setValue(item.description);
    this.todoForm.controls['assignby'].setValue(item.assignby);
    this.isEditEnabled = true;
    this.updatedId = i;
  }

  drop(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

}
