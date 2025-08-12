import { Component } from '@angular/core';
import { SharedServiceService } from '../../shared-service.service';
import { GetBookingDetailsDto } from '../../../Models/DTOs/GetBookingDetailsDto';
import { TokenService } from '../../common/TokenService';
import { Router } from '@angular/router';
import { TokenDto } from '../../../Models/DTOs/TokenDto';

@Component({
  selector: 'app-mybookings',
  standalone: false,
  templateUrl: './mybookings.component.html',
  styleUrl: './mybookings.component.css'
})
export class MybookingsComponent {
  
  bookingDetails!:GetBookingDetailsDto[]
  constructor(private service:SharedServiceService,private router:Router){}

  ngOnInit(){
    let token:TokenDto=new TokenDto()
    token.tokenId=new TokenService().returnToken()?.tokenId

    if(token!=undefined){
       this.service.selectMyBookings(token).subscribe((res)=>{
          this.bookingDetails=res.Data
       })
    }
    else{
      this.router.navigate(['/login']);
    }
     
  }

}
