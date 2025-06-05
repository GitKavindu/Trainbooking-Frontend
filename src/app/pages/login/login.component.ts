import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedServiceService } from '../../shared-service.service';
import { LoginUserDto } from '../../../Models/DTOs/LoginUserDto';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm!: FormGroup
  errMessege:string=''
  messege!:string

  constructor(private fb: FormBuilder,private service:SharedServiceService) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],   
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  onClear(): void {

    this.loginForm.reset({
      username: '',
      password: ''
    });

    this.errMessege=''
  }

  getControl(name: string): FormControl {
    return this.loginForm.get(name) as FormControl;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      let submitModel:LoginUserDto={
        userName:this.getControl('username').value,
        userPassword:this.getControl('password').value
      };
      
      this.service.loginUser(submitModel).subscribe(res=>{
          
          this.service.userToken=res.Data
          console.log(this.service.userToken)
        },
        (err)=>{
          this.errMessege=err.error.Data.messege
        }
      )
    }
  }

}
