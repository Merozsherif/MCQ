import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../service/doctor.service';
import { AuthService } from '../../../auth/service/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrl: './subjects.component.scss'
})
export class SubjectsComponent implements OnInit {
  subjects: any[] = []
  user: any = {}
  constructor(private service: DoctorService, private auth: AuthService, private toaster: ToastrService) { }

  ngOnInit(): void {
    this.getSubjects()
    this.getUserInfo()
  }
  getSubjects() {
    this.service.getAllSubjects().subscribe((res: any) => {
      this.subjects = res
    })
  }
  getUserInfo() {
    this.auth.getRole().subscribe(res => {
      this.user = res
    })
  }

  delete(index: number) {
    let id = this.subjects[index].id
    this.subjects.splice(index, 1)
    this.service.deleteSubjects(id).subscribe(res => {
      this.toaster.success("تم الجذف بنجاح ")
    })
  }
}
