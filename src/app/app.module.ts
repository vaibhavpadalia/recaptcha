import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { routingComponents, AppRoutingModule } from './app-routing.module';
import { UserService } from './user.service';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RecaptchaModule } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
import { AuthGuard } from './auth.guard';
import { AnonymousGuard } from './anonymous.guard';



@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    RecaptchaModule.forRoot(),
    RecaptchaFormsModule,
  ],
  providers: [ UserService, AuthGuard, AnonymousGuard ],
  bootstrap: [AppComponent]
})
export class AppModule { }
