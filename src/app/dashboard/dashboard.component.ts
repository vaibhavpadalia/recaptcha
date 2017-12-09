import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  verified: string;
  verifyToken: string;
  name: string;

  constructor(private service: UserService) { }

  ngOnInit() {
    this.service.getDetails().subscribe(res => {
      if (JSON.parse(res.text()).success === true) {
        this.verified = JSON.parse(res.text()).verified;
        this.verifyToken = JSON.parse(res.text()).verifyToken;
        this.name = JSON.parse(res.text()).name;
      }
    });
  }

  checkVerification(verify: string) {
    if (verify === this.verifyToken) {
      this.service.verifyEmail().subscribe(res => {
        console.log(res);
      });
      this.verified = 'Yes';
    } else {
      alert('Verification code entered is wrong !!');
    }
  }

  changePassword(oldPassword, newPassword, confirmPassword) {
     if (newPassword === confirmPassword) {
       this.service.changePassword(oldPassword, newPassword)
        .subscribe(res => {
          if (JSON.parse(res.text()).success) {
          alert('Password changed successfully !');
          } else {
            alert('Old password entered is wrong !');
          }
        });
     } else {
       alert('Passwords don\'t match !' );
     }
  }

}
