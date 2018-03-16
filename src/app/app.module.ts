import { FooterComponent } from './../common/component/footer/footer.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { AppRoutingModule } from './app.routing.module';
import { AuthService } from '../common/services/auth.service';
import { HttpModule } from '@angular/http';
import { AuthGuard } from '../common/services/authguard';
import { fakeBackendProvider } from '../common/fake/fake-backend';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from '../common/fake/jwt-interceptor';
import { HeaderComponent } from '../common/component/header/header.component';
import { ImageCropperModule } from "ng2-img-cropper/index";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SigninComponent,
    SignupComponent,
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    RouterModule,
    HttpModule,
    HttpClientModule,
    ReactiveFormsModule,
    ImageCropperModule
  ],
  providers: [FormBuilder, AuthService, AuthGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor,
    multi: true
  }, fakeBackendProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
