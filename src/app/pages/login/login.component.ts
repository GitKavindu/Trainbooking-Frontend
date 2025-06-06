import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedServiceService } from '../../shared-service.service';
import { LoginUserDto } from '../../../Models/DTOs/LoginUserDto';
import { TokenService } from '../../common/TokenService';
import { Router } from '@angular/router';

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

  constructor(private fb: FormBuilder,private service:SharedServiceService,private router:Router) {}

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
    localStorage.removeItem('userToken');
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
          
          new TokenService().setToken(res.Data)
          this.router.navigateByUrl('/station');
        },
        (err)=>{
          this.errMessege=err.error.Data.messege
        }
      )
    }
  }

}
