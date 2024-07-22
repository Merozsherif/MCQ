import { Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DoctorService } from '../../../doctor/service/doctor.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../auth/service/auth.service';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrl: './exam.component.scss'
})
export class ExamComponent implements OnInit {
  id: any;
  subject: any;
  studentInfo: any;
  user: any;
  total: number = 0;
  showResult: boolean = false;
  validExam: boolean = true;
  userSubjects: any[] = []
  constructor(private route: ActivatedRoute, private service: DoctorService, private toaster: ToastrService,
    private auth: AuthService
  ) {
    this.id = this.route.snapshot.paramMap.get("id")
    this.getSubject()
    this.getLoggedInUser()

  }
  ngOnInit(): void {

  }
  getSubject() {
    this.service.getSubjectsById(this.id).subscribe(res => {
      this.subject = res
    })
  }
  getLoggedInUser() {
    this.auth.getRole().subscribe(res => {
      this.user = res
      this.getUserData()
    })
  }
  getUserData() {
    this.auth.getStudent(this.user.userId).subscribe((res: any) => {
      this.studentInfo = res
      this.userSubjects = res?.subjects ? res?.subjects : []
      this.checkValidExam()
    })
  }
  getAnswer(event: any) {
    let value = event.value,
      questionIndex = event.source.name;
    this.subject.questions[questionIndex].studentAnswer = value
  }
  checkValidExam() {
    for (let x in this.userSubjects) {
      if (this.userSubjects[x].id == this.id) {
        this.total = this.userSubjects[x].degree
        this.validExam = false
        this.toaster.warning("لقد انجزت هذا الاختبار مسبقا")
      }
    }
  }
  getResult() {
    this.total = 0
    for (let x in this.subject.questions) {
      if (this.subject.questions[x].studentAnswer == this.subject.questions[x].correctAnswer) {
        this.total++
      }
    }
    this.showResult = true
    this.userSubjects.push({
      name: this.subject.name,
      id: this.id,
      degree: this.total
    })
    const model = {
      username: this.studentInfo.username,
      email: this.studentInfo.email,
      password: this.studentInfo.password,
      subjects: this.userSubjects
    }
    this.auth.updateStudent(this.user.userId, model).subscribe(res => {
      this.toaster.success("تم تسجيل النتيجة بنجاح")
    })
  }
  delete(index: number) {
    this.subject.questions.splice(index, 1)
    const model = {
      id: this.subject.name,
      questions: this.subject.questions
    }
    this.service.updateSubject(model, this.id).subscribe(res => {
      this.toaster.success("تم الحذف بنجاح")
    })
  }
}
