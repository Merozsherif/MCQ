import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http: HttpClient) { }
  createSubject(model: any) {
    return this.http.post(environment.baseApi + "subjects", model)
  }
  updateSubject(model: any, id: any) {
    return this.http.put(environment.baseApi + "subjects/" + id, model)
  }
  getAllSubjects() {
    return this.http.get(environment.baseApi + "subjects")
  }
  getSubjectsById(id: any) {
    return this.http.get(environment.baseApi + "subjects/" + id)
  }
  deleteSubjects(id: any) {
    return this.http.delete(environment.baseApi + "subjects/" + id)
  }
}
