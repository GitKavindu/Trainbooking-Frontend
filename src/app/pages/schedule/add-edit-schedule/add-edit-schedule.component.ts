import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Train } from '../../../../Models/Train';
import { SharedServiceService } from '../../../shared-service.service';
import { Station } from '../../../../Models/Station';

@Component({
  selector: 'app-add-edit-schedule',
  standalone: false,
  templateUrl: './add-edit-schedule.component.html',
  styleUrl: './add-edit-schedule.component.css'
})
export class AddEditScheduleComponent {
  
  scheduleForm!:FormGroup
  errMessege:string=''

  trainList:Train[]=[]
  selectedModel!:Train

  startStationList:Station[]=[]

  @Output() notifyParent = new EventEmitter<void>();

  constructor(private fb: FormBuilder,private service:SharedServiceService){}

  ngOnInit(): void {
    this.scheduleForm = this.fb.group({
      username: ['', Validators.required],   
      password: ['', [Validators.required, Validators.minLength(4)]],
      train:new Train(),
      station:new Station()
    });

    this.getTrainList()
    this.getStationsList()
  }

  closeForm():void{
    this.notifyParent.emit();
  }

  //schedule form methods
  getControl(name: string): FormControl {
    return this.scheduleForm.get(name) as FormControl;
  }

  onSubmit(): void {}
  onClear(): void {}

  getTrainList(){
    this.service.getAllTrains().subscribe(res=>{
      this.trainList=res.Data;
      
      //this.scheduleForm.patchValue({ train: res.Data[0].train_no});
    })
  }

  getStationsList(){
    this.service.getAllStations().subscribe(res=>{
        this.startStationList=res.Data
    })
  }

}
