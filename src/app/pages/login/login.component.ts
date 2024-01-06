import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { JsonPipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../services/login.service';
import { error } from 'console';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatCardModule,
    HttpClientModule,
    JsonPipe
  ],
  // providers:[LoginService,
  //   // {
  //   //   provide: HTTP_INTERCEPTORS,
  //   //   useClass: AuthInterceptor,
  //   //   multi: true,
  //   // },
  // ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginData = {
    username: '',
    password: ''
  }
  constructor(private snack: MatSnackBar, private loginService: LoginService, private router: Router) { }

  formSubmit() {
    if (this.loginData.username.trim() == '' || this.loginData.username == null) {
      this.snack.open("username is required !!", "", {
        duration: 3000
      });
      return;
    }
    if (this.loginData.password.trim() == '' || this.loginData.password == null) {
      this.snack.open("password is required !!", "", {
        duration: 3000
      });
      return;
    }
    //request to server to generate token
    this.loginService.generateToken(this.loginData).subscribe(
      (data: any) => {
        console.log('success');
        console.log(data);
        //login..
        this.loginService.loginUser(data.token);
        this.loginService.getCurrentUser().subscribe(
          (user: any) => {
            this.loginService.setUser(user);
            console.log(user);
            //redirect ..ADMIN : admin-dashboard
            //redirect ..NORMAL : normal-dashboard
            let role = this.loginService.getUserRole();
            if (role == "ADMIN") {
              //window.location.href='/admin'; // this reload the page
              this.router.navigate(['admin']);

              this.loginService.loginStatusSubject.next(true);
            } else if (role == "NORMAL") {
              //window.location.href='/user-dashboard';
              this.router.navigate(['user-dashboard/0']);
              this.loginService.loginStatusSubject.next(true);
            }
            else {
              this.loginService.logout();

            }
          },
          (error) => {
            console.log(error);
          }
        );
      },
      (error) => {
        console.log('invalid user');
        console.log(error);
        this.snack.open("Invalid details !! Try again", "", {
          duration: 3000
        });
      }
    );
  }
}
