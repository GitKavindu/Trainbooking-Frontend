import { Component } from '@angular/core';
import { SharedServiceService } from '../../shared-service.service';
import { GetBookingDetailsDto } from '../../../Models/DTOs/GetBookingDetailsDto';
import { TokenService } from '../../common/TokenService';
import { Router } from '@angular/router';
import { TokenDto } from '../../../Models/DTOs/TokenDto';
import { BookingDetails } from '../../../Models/BookingDetails';
import { Apartment } from '../../../Models/Apartment';
import { NavigationService } from '../../common/NavigationService';

@Component({
  selector: 'app-mybookings',
  standalone: false,
  templateUrl: './mybookings.component.html',
  styleUrl: './mybookings.component.css'
})
export class MybookingsComponent {
  
  getbookingDetailsDto!:GetBookingDetailsDto[] 
  bookingDetails:BookingDetails[]=[]
  navigationService:NavigationService<BookingDetails>

  constructor(private service:SharedServiceService,private router:Router){
    this.navigationService=new NavigationService<BookingDetails>(this.bookingDetails)
  }

  ngOnInit(){
    let token:TokenDto=new TokenDto()
    token.tokenId=new TokenService().returnToken()?.tokenId

    if(token.tokenId!=undefined){
       this.service.selectMyBookings(token).subscribe((res)=>{
          this.getbookingDetailsDto=res.Data
          this.mapGetBookingDetailsDtoToBookingDetailsModel()
       })
    }
    else{
      this.router.navigate(['/login']);
    }
     
  }

  rowClick(booking:BookingDetails){

    let rowNo:number=this.getRealRow(booking)

    if(this.bookingDetails[rowNo].showRow==false)
      this.getMoreBookingDetails(rowNo)
    else
      this.displayRow(rowNo)
  }

  getRealRow(booking:BookingDetails):number{
    
    for(let i=0;i<this.bookingDetails.length;i++){
      if(booking.getbookingDetailsDto.bookingId==this.bookingDetails[i].getbookingDetailsDto.bookingId)
        return i
    }

    return -1
  }

  displayRow(rowNo:number){
    this.bookingDetails[rowNo].showRow=!this.bookingDetails[rowNo].showRow
  }

  getBookingDetails(bookingId:number){
    let getbookingDetailsDto=new GetBookingDetailsDto()
    this.service.getBookingDetails(bookingId).subscribe((res)=>{
       getbookingDetailsDto=res.Data
    })
    return getbookingDetailsDto
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

  // mapGetBookingDetailsDtoToBookingDetailsModel(){
  //   //this.bookingDetails=new Array(this.getbookingDetailsDto.length)
  //   let vari=Object.keys(this.getbookingDetailsDto)
    
  //   for(let i=0;i<this.getbookingDetailsDto.length;i++){  
  //       let bookingDetails=new BookingDetails()
  //       bookingDetails.bookingId=this.getbookingDetailsDto[i].bookingId
  //       bookingDetails.scheduleId=this.getbookingDetailsDto[i].scheduleId
  //       bookingDetails.trainName=this.getbookingDetailsDto[i].trainName
  //       bookingDetails.fromStationNo=this.getbookingDetailsDto[i].fromStationNo
  //       bookingDetails.fromStationSeqNo=this.getbookingDetailsDto[i].fromStationSeqNo
  //       bookingDetails.toStationNo=this.getbookingDetailsDto[i].toStationNo
  //       bookingDetails.toStationSeqNo=this.getbookingDetailsDto[i].toStationSeqNo
  //       bookingDetails.price=this.getbookingDetailsDto[i].price
  //       bookingDetails.isCanceled=this.getbookingDetailsDto[i].isCanceled
  //       bookingDetails.bookedSeats=this.getbookingDetailsDto[i].bookedSeats
  //       bookingDetails.bookingDate=this.getbookingDetailsDto[i].bookingDate
  //       bookingDetails.bookingTime=this.getbookingDetailsDto[i].bookingTime

  //       for(let i=0;i<vari.length;i++){
  //         if( (vari[i] in bookingDetails)==true){
  //           let key: keyof BookingDetails = "bookingId";
  //           bookingDetails[key] = 1;
  //         }
  //       }
        
  //   }
  // }

  mapGetBookingDetailsDtoToBookingDetailsModel(){
     for(let i=0;i<this.getbookingDetailsDto.length;i++){ 
        let bookingDetails=new BookingDetails()
        bookingDetails.getbookingDetailsDto=this.getbookingDetailsDto[i]
        this.bookingDetails.push(bookingDetails)
     }
  }

  getApartmentIds(rowNo:number){
    let lastApartmentId:number=0
    this.bookingDetails[rowNo].apartmentIds=new Array<number>()

    for(let i=0;i<this.getbookingDetailsDto[rowNo].bookedSeats.length;i++){ 
      
      if(this.bookingDetails[rowNo].getbookingDetailsDto.bookedSeats[i].apartmentId!=lastApartmentId){
        lastApartmentId=this.bookingDetails[rowNo].getbookingDetailsDto.bookedSeats[i].apartmentId
        this.bookingDetails[rowNo].apartmentIds.push(lastApartmentId)
      }
    }

    this.bookingDetails[rowNo].apartments=new Array<Apartment>()
    
    this.service.getAllApartments(this.bookingDetails[rowNo].getbookingDetailsDto.trainNo,this.bookingDetails[rowNo].getbookingDetailsDto.trainSeqNo)
      .subscribe((res=>{
               
        for(let i=0;i<this.bookingDetails[rowNo].apartmentIds.length;i++){
          for(let j=0;j<res.Data.length;j++){
            if(this.bookingDetails[rowNo].apartmentIds[i]==res.Data[j].Apartment_id)
                this.bookingDetails[rowNo].apartments.push(res.Data[j])
          }
        }

        this.bookingDetails[rowNo].selectedApartmentIndex=0
        this.displayRow(rowNo)
      }))

  }

  getMoreBookingDetails(rowNo:number):void{
    this.service.getBookingDetails(this.bookingDetails[rowNo].getbookingDetailsDto.bookingId).subscribe((res)=>{
        this.bookingDetails[rowNo].getbookingDetailsDto.bookedSeats=res.Data.bookedSeats
        this.bookingDetails[rowNo].getbookingDetailsDto.fromStationNo=res.Data.fromStationNo
        this.bookingDetails[rowNo].getbookingDetailsDto.fromStationSeqNo=res.Data.fromStationSeqNo
        this.bookingDetails[rowNo].getbookingDetailsDto.toStationNo=res.Data.toStationNo
        this.bookingDetails[rowNo].getbookingDetailsDto.toStationSeqNo=res.Data.toStationSeqNo
        this.bookingDetails[rowNo].getbookingDetailsDto.trainNo=res.Data.trainNo
        this.bookingDetails[rowNo].getbookingDetailsDto.trainSeqNo=res.Data.trainSeqNo
        this.getApartmentIds(rowNo)
    })
  }
  
  

}