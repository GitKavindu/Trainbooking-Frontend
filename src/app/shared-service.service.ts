import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseResponse } from '../Models/BaseResponse';
import { RegisterUserDto } from '../Models/DTOs/RegisterUserDto';
import { LoginUserDto } from '../Models/DTOs/LoginUserDto';
import { Token } from '../Models/Token';
import { TokenService } from './common/TokenService';


@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {

  readonly APIUrl="http://localhost:5000";

  public userToken:Token | undefined
  private tokenService:TokenService

  constructor(private http:HttpClient) {
    this.tokenService=new TokenService()
    this.userToken=this.tokenService.returnToken()  
   }

  registerUser(registerUserDto:RegisterUserDto){
    return this.http.post<BaseResponse<string>>(this.APIUrl+"/User/registerUser",registerUserDto);
  }

  loginUser(loginUser:LoginUserDto){
    return this.http.post<BaseResponse<Token>>(this.APIUrl+"/User/getuserToken",loginUser);
  }
}