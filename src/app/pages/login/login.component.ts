import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedServiceService } from '../../shared-service.service';
import { LoginUserDto } from '../../../Models/DTOs/LoginUserDto';
import { TokenService } from '../../common/TokenService';
import { Router } from '@angular/router';
import { Token } from '../../../Models/Token';

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
  tokenService:TokenService
  constructor(private fb: FormBuilder,private service:SharedServiceService,private router:Router) {
    this.tokenService=new TokenService()
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],   
      password: ['', [Validators.required, Validators.minLength(4)]]
    });

    let token:Token | undefined=this.tokenService.returnToken()
    if(token!=undefined)
      this.router.navigateByUrl('/')
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
