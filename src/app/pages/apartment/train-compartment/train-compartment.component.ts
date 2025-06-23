import { Component, Input } from '@angular/core';
import { SeatModel } from '../../../../Models/SeatModel';

@Component({
  selector: 'app-train-compartment',
  standalone: false,
  templateUrl: './train-compartment.component.html',
  styleUrl: './train-compartment.component.css'
})
export class TrainCompartmentComponent {

  @Input() type:number=1
  @Input() seat :SeatModel[] | undefined
  seats!:SeatModel[]

  ngOnInit():void{
    if(this.seat!=undefined)
       this.seats=this.seat
  }

  selectedSeats: string[] = [];

  toggleSeatSelection(seat: any,rowNo:number,isLeft:'L'|'R'): void {
    if (seat.available) {
      seat.selected = !seat.selected;
      
      const index = this.selectedSeats.indexOf(rowNo+isLeft+seat.number);
      if (index === -1) {
        this.selectedSeats.push(rowNo+isLeft+seat.number);
      } else {
        this.selectedSeats.splice(index, 1);
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
      return 'Booked'
    else
      return 'Already Disabled'
  }
  
} 
    