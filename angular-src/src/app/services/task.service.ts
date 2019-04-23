import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TaskService {

  constructor(private http:Http) {
    console.log("task service initilized..");
   }

   getTasks(){
     let headers = new Headers();
     headers.append('Content-Type','application/json');
     let ep = this.prepEndpoint('api/tasks');


     return this.http.get(ep,{headers: headers})
     .map(res => res.json());
   }

   addTask(newTask){
     let headers = new Headers();
     headers.append('Content-Type','application/json');
     let ep = this.prepEndpoint('api/task');

     return this.http.post(ep, JSON.stringify(newTask), {headers: headers})
      .map(res => res.json());
   }

   deleteTask(id){
     let headers = new Headers();
     headers.append('Content-Type','application/json');
     let ep = this.prepEndpoint('api/task/'+id);

     return this.http.delete(ep)
      .map(res => res.json());
   }

   updateStatus(task){
     let headers = new Headers();
     headers.append('Content-Type','application/json');
     let ep = this.prepEndpoint('api/task/'+task._id);

     return this.http.put(ep, JSON.stringify(task), {headers: headers})
      .map(res => res.json());
   }

   prepEndpoint(ep){
      return ep;
      // return 'http://localhost:8080/'+ep;
}
}
