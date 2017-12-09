import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

export interface FormModel {
  captcha?: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public formModel: FormModel = {};

  constructor(private router: Router, private service: UserService) { }

  ngOnInit() {
  }

  login(email: string, password: string) {
    this.service.login(email, password).subscribe(res => {
      console.log(res);
      if (JSON.parse(res.text()).success === true) {
        this.router.navigate(['/dashboard']);
        localStorage.setItem('email', JSON.parse(res.text()).email);
      } else {
        alert('Login Failed !!');
      }
    });
  }
}
