import { Component, OnInit } from '@angular/core';
import { DiverService } from '../../services/diver.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    loginform: FormGroup;
    validMessage: string = "";

    constructor(private diverService: DiverService) { }

    ngOnInit(){
    this.loginform = new FormGroup({
    id: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    });
    }

    submitLogin(){
      if (this.loginform.valid){
        this.diverService.login(this.loginform.value).subscribe(
        data => {
        this.loginform.reset();
        this.processLogin(data);
        return true;
        },
        error => {
          return throwError;
        }
        )
      } else {
        this.validMessage = "Please fill out required fields."
      }
      }

    processLogin(data){
      if (data){
        this.validMessage = "You're in our system!"
      }else{
        this.validMessage = "Id and password combination is incorrect."
      }
    }
}
