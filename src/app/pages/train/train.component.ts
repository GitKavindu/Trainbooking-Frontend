import { Component } from '@angular/core';
import { SharedServiceService } from '../../shared-service.service';
import { Train } from '../../../Models/Train';
import { TrainDto } from '../../../Models/DTOs/TrainDto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-train',
  standalone: false,
  templateUrl: './train.component.html',
  styleUrl: './train.component.css'
})
export class TrainComponent {
  constructor(private service:SharedServiceService,private router:Router){}
  
      TrainList:Train[]=[]
      ModalTitle!:string
      ActivateAddEditTrainComp:boolean=false

      Train!:Train
      enableApartment:boolean=false

      TrainIdFilter:string=""
      TrainNameFilter:string=""
      TrainListWithoutFilter:any=[]
      ngOnInit():void{
        this.refreshTrainList();
      }
  
      addClick(){
        this.Train={
          train_no:0,
          train_name:'',
          train_seq_no:0,
          created_date: '',
          lastUpdated_date:'',
          added_by:''
        }
        this.ModalTitle="Add Train"
        this.ActivateAddEditTrainComp=true
      }
  
      editClick(item: Train){
        this.Train=item
        this.ModalTitle="Edit Train"
        this.ActivateAddEditTrainComp=true
      }
  
      deleteClick(TrainId:any){
        if(confirm('Are you sure ?')){
          
          let val:TrainDto={
            train_id:TrainId,
            train_name:'',
            token_id:this.service.tokenService.returnToken()?.tokenId
          }
  
          this.service.deleteTrain(val).subscribe((res)=>{
            alert(res.Data.toString());
            this.refreshTrainList()
          })
        }
        
      }
  
      closeClick(){
        this.ActivateAddEditTrainComp=false
        this.refreshTrainList()
      }
  
      refreshTrainList(){
        this.service.getAllTrains().subscribe(res=>{
          this.TrainList=res.Data;
          this.TrainListWithoutFilter=res.Data
        })
      }
  
      filterFn(){
        var TrainIdFilter=this.TrainIdFilter
        var TrainNameFilter=this.TrainNameFilter
  
        this.TrainList=this.TrainListWithoutFilter.filter(function(el:any){
          return el.train_no.toString().toLowerCase().includes(
            TrainIdFilter.toString().trim().toLowerCase()
          )
          &&
          el.train_name.toString().toLowerCase().includes(
            TrainNameFilter.toString().trim().toLowerCase()
          )
        })
      }
  
      sortResult(prop:any,asc:boolean){
          this.TrainList=this.TrainListWithoutFilter.sort(function(a:any,b:any){
            if(asc){
                return (a[prop]>b[prop])?1:((a[prop]<b[prop])?-1:0)
            }else{
              return (a[prop]<b[prop])?1:((a[prop]>b[prop])?-1:0)
            }
          })
      }

      enableDisableApartmentForTrain(i:number,train_id:number,train_seq_no:number){
        this.enableApartment=!this.enableApartment;
        this.router.navigate(['/apartment'], {
          queryParams: { trainId: train_id, seqNo: train_seq_no}
        });
      }
}
