import { Component } from '@angular/core';
import {NgFor} from '@angular/common';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { Board } from 'src/app/models/board.model';
import { Column } from 'src/app/models/column.model';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent {

  board: Board = new Board('Test Board', [
    new Column("Backlog", [new Task("Write some User Stories")]),
    new Column("In Progress", [new Task("Doing some Research")]),
    new Column("Quality Assurance", [new Task("Make sure everything works!")]),
    new Column("Done", [new Task("Ship it!")]),
  ]);

  // adding function to add new tasks
  addTask(column: Column, title: string) {
    column.tasks.push(new Task(title));
  }

  // adding function to edit a task
  editTask(task: Task, newTitle: string) {
    task.title = newTitle;
  }

  // adding function to delete a task
  deleteTask(column: Column, task: Task) {
    const index= column.tasks.indexOf(task);
    if(index !== -1) {
      column.tasks.splice(index, 1);
    }
  }

  drop(event: CdkDragDrop<Task[]>) {
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
