import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { AuthGuard } from './auth.guard';
import { AnonymousGuard } from './anonymous.guard';


const routes: Routes = [
    { path: 'login', component: LoginComponent, canActivate: [AnonymousGuard]  },
    { path: 'signup', component: SignupComponent, canActivate: [AnonymousGuard]   },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'forgetPassword', component: ForgetPasswordComponent },
    { path: '', component: LoginComponent },
    { path: '**', component: LoginComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }

export const routingComponents = [LoginComponent, SignupComponent, DashboardComponent,
    ForgetPasswordComponent];

