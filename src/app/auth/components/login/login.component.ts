import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup
  users: any[] = []
  type: string = "students"

  constructor(private fb: FormBuilder,
    private service: AuthService,
    private router: Router,
    private toaster: ToastrService) { }

  ngOnInit(): void {
    this.createForm()
    this.getUsers()
  }
  createForm() {
    this.loginForm = this.fb.group({
      type: [this.type],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]]
    })
  }
  getRole(event: any) {
    this.type = event.value
    this.getUsers()
  }

  getUsers() {
    this.service.getUsers(this.type).subscribe((res: any) => {
      this.users = res
    })
  }
  submit() {

    let index = this.users.findIndex(item => item.email == this.loginForm.value.email && item.password == this.loginForm.value.password)
    if (index == -1) {
      this.toaster.error("الايميل او كلمة المرور غير صحيحة ", "", {
        disableTimeOut: false,
        titleClass: "toastr_title",
        messageClass: "toastr_message",
        timeOut: 5000,
        closeButton: true,
      })
    } else {
      const model = {
        username: this.users[index].username,
        role: this.type,
        userId: this.users[index].id,
      }
      this.service.login(model).subscribe(res => {
        this.service.user.next(res)
        this.toaster.success("تم تسجيل الدخول بنجاح  ", "", {
          disableTimeOut: false,
          titleClass: "toastr_title",
          messageClass: "toastr_message",
          timeOut: 5000,
          closeButton: true,
        })
        this.router.navigate(['/subjects'])
      })

    }

  }
}
