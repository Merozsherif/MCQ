import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'quiz';

  constructor(private service: AuthService) { }
  ngOnInit(): void {
    this.getUserDate()
  }

  getUserDate() {
    this.service.getRole().subscribe(res => {
      this.service.user.next(res)
    })
  }

}


