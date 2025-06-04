import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseResponse } from '../Models/BaseResponse';
import { RegisterUserDto } from '../Models/DTOs/RegisterUserDto';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {

  readonly APIUrl="http://localhost:5000";

  constructor(private http:HttpClient) { }

  registerUser(registerUserDto:RegisterUserDto){
    return this.http.post<BaseResponse<string>>(this.APIUrl+"/User/registerUser",registerUserDto);
  }
}