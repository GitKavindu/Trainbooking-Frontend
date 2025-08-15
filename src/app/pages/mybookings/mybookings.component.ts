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
  
  bookingDetails!:(GetBookingDetailsDto | string)[] 
  
  constructor(private service:SharedServiceService,private router:Router){}

  ngOnInit(){
    let token:TokenDto=new TokenDto()
    token.tokenId=new TokenService().returnToken()?.tokenId

    if(token!=undefined){
       this.service.selectMyBookings(token).subscribe((res)=>{
          this.bookingDetails=res.Data
          this.bookingDetails.splice(2,0,'dsadsadsad')
       })
    }
    else{
      this.router.navigate(['/login']);
    }
     
  }

  rowClick(){
    
  }

  getBookingId(bookingNum:number){
    return 'BS' + (bookingNum.toString().padStart(4, '0'))
  }

  isGetBookingDetailsDto(booking: string | GetBookingDetailsDto): booking is GetBookingDetailsDto {
     return typeof booking === 'object' && booking !== null && booking!=undefined && 'bookingId' in booking //this.checkIfGetBookingDetailsDto(booking);
  }

  isString(booking: string | GetBookingDetailsDto): booking is string {
    return typeof booking === 'string';
  }

  checkIfGetBookingDetailsDto(booking:any):boolean{
    let gh:GetBookingDetailsDto=new GetBookingDetailsDto()
    let vari=Object.keys(gh)
    console.log('varii ',vari)
    for(let i=0;i<vari.length;i++){
      if( (vari[i] in booking)==false)
        return false
    }
    return true
  }


}