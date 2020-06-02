import { Injectable } from '@angular/core';
import {Http,Response, Headers, RequestOptions } from '@angular/http';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http: Http) {}

    getCabs(): Observable<any> {
   return this.http.get('http://localhost:8000/cabs/get');
      }

   bookCabs(num1): Observable<Object> {

     return this.http.put('http://localhost:8000/book', {'id': num1});
   }
   unbookCabs(num1): Observable<Object> {
     return this.http.put('http://localhost:8000/unbook', {'id': num1});
   }
   ridesHistory(num1): Observable<Object> {
     return this.http.put('http://localhost:8000/rides/get', {'id': num1});
   }



}
