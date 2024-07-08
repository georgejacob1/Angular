import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private _http:HttpClient) { }

  addEmploye(data:any): Observable<any> {
    return this._http.post('http://localhost:3000/employesss',data);
  }

  getEmploye(): Observable<any> {
    return this._http.get('http://localhost:3000/employesss');
  }

  deleteEmploye(id: any): Observable<any> {
    return this._http.delete(`http://localhost:3000/employesss/${id}`);
  }

  updateEmploye(id: any,data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/employesss/${id}`,data);
  }

}
