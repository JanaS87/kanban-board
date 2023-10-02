import { Component, OnInit } from '@angular/core';
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
export class MainViewComponent implements OnInit {

  task: Task = new Task("");

  board: Board = new Board('Test Board', [
    new Column("Backlog", [new Task("Write some User Stories")]),
    new Column("In Progress", [new Task("Doing some Research")]),
    new Column("Quality Assurance", [new Task("Make sure everything works!")]),
    new Column("Done", [new Task("Ship it!")]),
  ]);

  ngOnInit() {
    this.loadBoardFromLocalStrorage();
  }

  loadBoardFromLocalStrorage() {
    const saveBoard = localStorage.getItem('board');
    if (saveBoard) {
      this.board = JSON.parse(saveBoard);
    }
  }

  saveBoardToLocalStorage() {
    localStorage.setItem('board', JSON.stringify(this.board));
  }

  isEditingBoardName = false;

  toggleEditBoardName() {
    this.isEditingBoardName = !this.isEditingBoardName;
  }

  updateBoardName() {
    this.saveBoardToLocalStorage();
    this.isEditingBoardName = false;
  }

  // adding function to add new tasks
  addTask(column: Column, title: string) {
    if(title.trim() === '') { // if title is empty, return
      return;
    }
    column.tasks.push(new Task(title));
    this.saveBoardToLocalStorage();
  }

  // adding function to edit a task
  toggleEdit(task: Task) {
    task.editing = !task.editing;
    this.saveBoardToLocalStorage();
  }

  // adding function to delete a task
  deleteTask(column: Column, task: Task) {
    const index= column.tasks.indexOf(task);
    if(index !== -1) {
      column.tasks.splice(index, 1);
      this.saveBoardToLocalStorage();
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
