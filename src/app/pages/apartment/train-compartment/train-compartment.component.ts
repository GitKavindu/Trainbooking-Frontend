import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SeatModel } from '../../../../Models/SeatModel';
import { Seat } from '../../../../Models/Seat';
import { CompartmentSeatModel } from '../../../../Models/CompartmentSeatModel';
import { SharedServiceService } from '../../../shared-service.service';
import { TokenService } from '../../../common/TokenService';
import { CommonService } from '../../../common/CommonService';
import { AddBookingDto } from '../../../../Models/DTOs/AddBookingDto';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-train-compartment',
  standalone: false,
  templateUrl: './train-compartment.component.html',
  styleUrl: './train-compartment.component.css'
})
export class TrainCompartmentComponent {

  type:number
  @Input() seat :Seat[] | undefined
  @Input() apartmentId:number
  seats!:SeatModel[]
  selectedModel:string = 'ResegetSeatModelForApartmentt';
  tokenService:TokenService

  scheduleId!:string
  startJourneyId!:number
  endJourneyId!:number

  bookedSeats:Seat[]| null=null;
  selectedSeats: Seat[] = [];

  ngOnInit():void{
    //
    this.route.queryParams.subscribe(params => {
        if (Object.keys(params).length === 0) {
          console.log('No query parameters');
          this.scheduleId=''
          this.startJourneyId=0
          this.endJourneyId=0
          
        } else {
          this.scheduleId = params['scheduleId'];
          this.startJourneyId=+params['startJourneyId'];
          this.endJourneyId=+params['endJourneyId'];
        }
       
    });
    
    
    if(this.type==1 && this.startJourneyId!= 0){
      this.service.selectBookedSeatsForJourney(this.startJourneyId,this.endJourneyId,this.apartmentId).subscribe((res)=>{
        this.bookedSeats=res.Data
        if(this.seat!=undefined){
          this.seats=new CommonService().convertSeatToSeatModel(this.seat)
        }
      })
    }
    
    
  }

  constructor(private service:SharedServiceService,private route:ActivatedRoute){
     this.tokenService=new TokenService()
     this.apartmentId=0

     if(this.tokenService.getIsUserAdmin()==undefined)
      this.type=3
     else if(this.tokenService.getIsUserAdmin()==false)
      this.type=1
     else
      this.type=2
  }

  toggleSeatSelection(seat: CompartmentSeatModel,rowNo:number,isLeft:boolean): void {

    if (seat.available && this.isSeatBooked(seat,isLeft,rowNo)===false) {
      seat.selected = !seat.selected;
      
      let addSeat:Seat
      let found:boolean=false

      for(let i=0;i<this.selectedSeats.length;i++){
        if( seat.number==this.selectedSeats[i].seqNo &&
            rowNo==this.selectedSeats[i].rowNo &&
            isLeft==this.selectedSeats[i].isLeft
          ){
            this.selectedSeats.splice(i, 1);
            found=true
        }
      }

      if(found==false){
        addSeat=new Seat()
        addSeat.isLeft=isLeft
        addSeat.rowNo=rowNo
        addSeat.seqNo=seat.number
        addSeat.apartmentId=this.apartmentId
        this.selectedSeats.push(addSeat);
      }
    }
  }

  getSeatClass(seat:CompartmentSeatModel,isLeft:boolean,rowNo:number): string {
    if(this.type==3)
      return 'bg-secondary text-white fake-disabled';
    else if (!seat.available)
      return 'bg-secondary text-white';

    if(this.type==1){
      if(this.isSeatBooked(seat,isLeft,rowNo)==false)
        return seat.selected ? 'bg-primary text-white' : 'bg-light';
      else
         return 'bg-secondary text-white';
    }
    else
      return seat.selected ? 'bg-third text-white' : 'bg-light';
  }

  getLabelClass():string{
    if(this.type==1)
      return 'badge bg-primary mr-2 text-white';
    else
      return 'badge mr-2 bg-third text-white';
  }

  getRightText(){
    if(this.type==1)
      return 'Booked / Not Available'
    else
      return 'Already Disabled'
  }

  returnSelectedSeats():string{
    let selectedSeatsString:string=''
    for(let i=0;i<this.selectedSeats.length;i++){
      selectedSeatsString+=this.selectedSeats[i].rowNo.toString()+(this.selectedSeats[i].isLeft?'L':'R')+this.selectedSeats[i].seqNo
      if(i!=this.selectedSeats.length-1)
        selectedSeatsString+=','
    }
    return selectedSeatsString
  }

  getUnselectedtedSeats(){
  for(let i=0;i<this.selectedSeats.length;i++){     
  }
  }

  onModelChange(event: Event){
    //console.log(event)
    if(this.selectedModel!="Reset"){
      this.service.getSeatModel().subscribe(res=>this.seats=res)
    }
    else{
      if(this.seat!=undefined)
        this.seats=new CommonService().convertSeatToSeatModel(this.seat)
    }
  }

  proceedClick(){
    console.log('proceed')

    let commonService:CommonService=new CommonService()
    let val:AddBookingDto={
      
      scheduleId:this.scheduleId,
      tokenId:this.service.tokenService.returnToken()?.tokenId,
      fromJourneyId:this.startJourneyId,
      toJourneyId:this.endJourneyId,
      seatModel:this.selectedSeats
    }
    this.service.bookSeats(val).subscribe(res=>{
      alert(res.Data.toString());
    })
  }

  getBookedSeatsModel(seat:Seat[]){
    let seatModel:SeatModel=new SeatModel()
    for(let i=0;i<seat.length;i++){
      let pushSeat:SeatModel
      
    }
  }

  removeBookedSeats(seats:Seat[],bookedSeats:Seat[]){
    
    for(let j=0;j<bookedSeats.length;j++){
      for(let i=0;i<seats.length;i++){
        if(
          seats[i].isLeft==bookedSeats[j].isLeft &&
          seats[i].rowNo==bookedSeats[j].rowNo &&
          seats[i].seqNo==bookedSeats[j].seqNo
        ){
          seats.splice(i,1)
          break
        }
      }      
    }
    
  }

  isSeatBooked(seat:CompartmentSeatModel,isLeft:boolean,rowNo:number):boolean{
    
    if(this.bookedSeats!=null){
      for(let i=0;i<this.bookedSeats.length;i++){
        if(
          isLeft==this.bookedSeats[i].isLeft &&
          rowNo==this.bookedSeats[i].rowNo &&
          seat.number==this.bookedSeats[i].seqNo
        ){
          return true
        }
      }
    }

    return false    
  }

} 
    