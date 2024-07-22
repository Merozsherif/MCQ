import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../service/doctor.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../auth/service/auth.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent implements OnInit {
  dataSource: any
  dataTable: any
  displayedColumns: any
  constructor(private service: DoctorService, private toaster: ToastrService,
    private auth: AuthService
  ) {
    this.displayedColumns = ['position', 'name', 'subjectName', 'degree'];
  }


  ngOnInit(): void {
    this.getStudents()
  }
  getStudents() {
    this.auth.getUsers("students").subscribe((res: any) => {
      this.dataSource = res?.map((student: any) => {
        if (student?.subjects) {
          return student?.subjects?.map((sub: any) => {
            return {
              name: student.username,
              subjectName: sub.name,
              degree: sub.degree
            }
          })
        } else {
          return [{
            name: student.username,
            subjectName: "-",
            degree: "-"
          }]

        }
      })
      this.dataTable = []
      this.dataSource.forEach((item: any) => {
        item.forEach((subItem: any) => {
          this.dataTable.push({
            name: subItem.name,
            subjectName: subItem.subjectName,
            degree: subItem.degree
          })
        });
      });
    })
  }

}
