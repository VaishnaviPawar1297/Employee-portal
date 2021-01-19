import { Injectable } from '@angular/core';
import {ReactiveFormComponent} from './reactive-form/reactive-form.component';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

//import { Hero } from './hero';
import { MessageService } from './message.service';


@Injectable({
  providedIn: 'root'
})
export class EditemployeeService {

  private employeesUrl = 'api/employee';  // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService)
   { }


}
