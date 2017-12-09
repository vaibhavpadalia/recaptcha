import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private service: UserService) { }

  ngOnInit() {
  }

  signup(name: string, email: string, password: string, confirm: string) {
    if (password === confirm) {
      this.service.signup(name, email, password).subscribe(res => {
        console.log(res);
        if (JSON.parse(res.text()).success === true) {
          alert('Signup Successful');
        } else {
          alert('Signup Failed');
        }
      });
    } else {
      alert('Passwords don\'t Match !');
    }
  }
}
