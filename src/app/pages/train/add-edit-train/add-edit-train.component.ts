import { Component, Input } from '@angular/core';
import { TrainDto } from '../../../../Models/DTOs/TrainDto';
import { SharedServiceService } from '../../../shared-service.service';
import { Train } from '../../../../Models/Train';

@Component({
  selector: 'app-add-edit-train',
  standalone: false,
  templateUrl: './add-edit-train.component.html',
  styleUrl: './add-edit-train.component.css'
})
export class AddEditTrainComponent {
  @Input() Train!:Train
  
  constructor(private service:SharedServiceService){}
  Trainid!:number
  Trainname!:string

  ngOnInit(): void {
      this.Trainid=this.Train.train_no
      this.Trainname=this.Train.train_name
  }
  addTrain(){
    let val:TrainDto={
      train_id:this.Trainid,
      train_name:this.Trainname,
      token_id:this.service.tokenService.returnToken()?.tokenId
    }
    this.service.addTrain(val).subscribe(res=>{
      alert(res.Data.toString());
    })
  }

  updateTrain(){
    let val:TrainDto={
      train_id:this.Trainid,
      train_name:this.Trainname,
      token_id:this.service.tokenService.returnToken()?.tokenId
    }
    console.log(val)
    this.service.editTrain(val).subscribe(res=>{
      alert(res.Data.toString());
    })
  }
}
