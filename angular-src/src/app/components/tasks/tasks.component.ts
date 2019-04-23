import { Component, OnInit } from '@angular/core';
import {TaskService} from '../../services/task.service';
import { Router } from '@angular/router';
import { Task } from '../../../../Task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: Task[];
  title: string;

  constructor(private TaskService:TaskService, private router:Router) {
    this.TaskService.getTasks()
    .subscribe(tasks => {
      //console.log(tasks);
        this.tasks = tasks;
    });
  }

  addTask(event){
    event.preventDefault();
     //console.log(this.title);

    let newTask = {
      title: this.title,
      isDone: false
    }

    this.TaskService.addTask(newTask)
      .subscribe(task => {
        this.tasks.push(task);
        this.title = '';
      });
  }

  deleteTask(id){
    let tasks = this.tasks;

    this.TaskService.deleteTask(id)
      .subscribe(data => {
        if(data.n == 1){
          for(let i=0; i< tasks.length; i++){
            if(tasks[i]._id == id){
              tasks.splice(i, 1);
            }
          }
        }
      });
  }

  updateStatus(task){
    let _task = {
      _id: task._id,
      title: task.title,
      isDone: !task.isDone
    };

    this.TaskService.updateStatus(_task)
      .subscribe(data => {
        task.isDone = !task.isDone;
      })


  }

  ngOnInit() {
  }

}
