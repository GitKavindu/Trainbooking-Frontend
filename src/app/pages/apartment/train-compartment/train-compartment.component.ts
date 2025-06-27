import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SeatModel } from '../../../../Models/SeatModel';
import { Seat } from '../../../../Models/Seat';
import { CompartmentSeatModel } from '../../../../Models/CompartmentSeatModel';
import { SharedServiceService } from '../../../shared-service.service';

@Component({
  selector: 'app-train-compartment',
  standalone: false,
  templateUrl: './train-compartment.component.html',
  styleUrl: './train-compartment.component.css'
})
export class TrainCompartmentComponent {

  @Input() type:number=2
  @Input() seat :SeatModel[] | undefined
  seats!:SeatModel[]
  selectedModel:string = 'Reset';

  ngOnInit():void{
    if(this.seat!=undefined)
       this.seats=this.seat

    //
  }

  constructor(private service:SharedServiceService){}

  selectedSeats: Seat[] = [];

  toggleSeatSelection(seat: CompartmentSeatModel,rowNo:number,isLeft:boolean): void {
    if (seat.available) {
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
        this.selectedSeats.push(addSeat);
      }
    }
  }

  getSeatClass(seat: any): string {
    if(this.type==3)
      return 'bg-secondary text-white fake-disabled';
    else if (!seat.available)
      return 'bg-secondary text-white';

    if(this.type==1)
      return seat.selected ? 'bg-primary text-white' : 'bg-light';
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
        this.seats=this.seat
    }
  }

} 
    