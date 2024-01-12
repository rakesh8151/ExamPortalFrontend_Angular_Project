import { JsonPipe } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserServiceService } from '../../services/user-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatCardModule} from '@angular/material/card';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
     MatInputModule,
     FormsModule,
     JsonPipe,
     HttpClientModule,
     MatCardModule
  ],
  providers: [ UserServiceService ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA 
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
constructor(private userService:UserServiceService,private snack:MatSnackBar,private router:Router){}
  public user={
    username:'',
    password:'',
    firstName:'',
    lastName:'',
    email:'',
    phone:'',
  };

  formSubmit(){
    console.log(this.user);
    if(this.user.username=='' || this.user.username==null){
      //alert("username is required !!");
      this.snack.open("username is required !!",'',{
        duration:3000
      });
      return;
    }
    this.userService.addUser(this.user).subscribe(
      (data:any)=>{
        //success
        console.log(data);
        
       // alert("success");
        Swal.fire("Successfully done","user id is "+data.id,'success').then((res)=>{
         if(res.isConfirmed){
          this.router.navigate(["/login"])
         }
        })
        
      },
      (error:any)=>{
        //error
        console.log(error);
       // alert("something went wrong");
        this.snack.open(error['error']['message'],'',{
          duration:3000
        });

      }
    );
  }
}
