import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../../common/TokenService';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  tokenService:TokenService
  constructor(private router:Router){
    this.tokenService=new TokenService()
  }

  goToBooking(){
    this.router.navigateByUrl("/booking")
  }

  goToMyBookings(){
    this.router.navigateByUrl("/mybookings")
  }

  goToSchedule(){
    this.router.navigateByUrl("/schedule")
  }

   goToLogin(){
    this.router.navigateByUrl("/login")
  }

  goToRegister(){
    this.router.navigateByUrl("/register")
  }
}
