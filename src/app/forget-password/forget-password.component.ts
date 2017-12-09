import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  constructor(private service: UserService) { }

  ngOnInit() {
  }

  resetPassword(email: string) {
    this.service.resetPassword(email).subscribe(res => {
      if (JSON.parse(res.text()).success === true) {
        alert('An email is sent to your registered Email address with a verification code. Use it as your password');
      } else {
        alert('Email id does not exist !');
      }
    });
  }

}
