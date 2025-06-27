import { Component, Input, ViewChild } from '@angular/core';
import { SharedServiceService } from '../../../shared-service.service';
import { ApartmentDto } from '../../../../Models/DTOs/ApartmentDto';
import { Apartment } from '../../../../Models/Apartment';
import { SeatModel } from '../../../../Models/SeatModel';
import { CommonService } from '../../../common/CommonService';
import { TrainCompartmentComponent } from '../train-compartment/train-compartment.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-edit-apartment',
  standalone: false,
  templateUrl: './add-edit-apartment.component.html',
  styleUrl: './add-edit-apartment.component.css'
})
export class AddEditApartmentComponent {
  @Input() Apartment!:Apartment

  constructor(private service:SharedServiceService,private route:ActivatedRoute){}
  Apartmentid!:number
  Apartmentclass!:string
  trainId:number=0
  trainSeqNo:number=0
  
  @ViewChild(TrainCompartmentComponent) compartment!: TrainCompartmentComponent;
  ngOnInit(): void {
    if(this.Apartment!=undefined){
        this.Apartmentid=this.Apartment.Apartment_id
      this.Apartmentclass=this.Apartment.ApartmrntClass
    }
    
    this.route.queryParams.subscribe(params => {
      const trainId = params['trainId'];
      const trainSeqNo = params['seqNo'];
      if(trainId!=undefined && trainSeqNo!=undefined){
        this.trainId=trainId
        this.trainSeqNo=trainSeqNo
      }
    });
  }
  addApartment(){
    // let val:ApartmentDto={
    //   apartment_id:this.Apartmentid,
    //   _class:this.Apartmentclass,
    //   tokenId:this.service.tokenService.returnToken()?.tokenId
    // }
    // this.service.addApartment(val).subscribe(res=>{
    //   alert(res.Data.toString());
    // })
  }

  updateApartment(){
    this.consoleLog()
    let commonService:CommonService=new CommonService()
    let val:ApartmentDto={
      apartment_id:this.Apartmentid,
      _class:this.Apartmentclass,
      tokenId:this.service.tokenService.returnToken()?.tokenId,
      train_id:this.trainId,
      train_seq_no:this.trainSeqNo,
      seatModel:commonService.convertSeatModelToSeat(this.compartment.seats,this.Apartmentid)
    }
    console.log(val)
    this.service.updateApartment(val).subscribe(res=>{
      alert(res.Data.toString());
    })
  }

  getSeatModelForApartment(){
     return new CommonService().convertSeatToSeatModel(this.Apartment.seatModel)
  }
  consoleLog(){
    console.log(this.compartment.selectedSeats)
  }  
}
