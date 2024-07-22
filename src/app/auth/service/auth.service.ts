import { environment } from './../../../environments/environment';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  user = new Subject()
  createUser(model: any) {
    return this.http.post(environment.baseApi + "students", model)
  }
  getUsers(type: String) {
    return this.http.get(environment.baseApi + type)
  }
  getStudent(id: any) {
    return this.http.get(environment.baseApi + "students/" + id)
  }
  updateStudent(id: any, model: any) {
    return this.http.put(environment.baseApi + "students/" + id, model)
  }
  login(model: any) {
    return this.http.put(environment.baseApi + "login/1", model)
  }
  getRole() {
    return this.http.get(environment.baseApi + "login/1")
  }
}
