import { Component } from '@angular/core';
import { SharedServiceService } from '../../shared-service.service';
import { Schedule } from '../../../Models/Schedule';
import { TokenService } from '../../common/TokenService';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceService } from '../../common/DeviceService';
import { NavigationService } from '../../common/NavigationService';

@Component({
  selector: 'app-schedule',
  standalone: false,
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css'
})
export class ScheduleComponent {
  
  
  
      ScheduleList:Schedule[]
      ModalTitle!:string
      ActivateAddEditScheduleComp:boolean=false

      Schedule!:Schedule
      enableApartment:boolean=false

      FromStationFilter:string=""
      ScheduleListWithoutFilter:any=[]

      enablethisschedule:boolean=false
      scheduleId:string=''

      titleText:string=''

      asc:boolean=true //represents ascending order
      startStation:boolean=false
      endStation:boolean=false
      train:boolean=false

      selectedModel:string='start'
      tokenService:TokenService

      deviceService:DeviceService
      navigationService:NavigationService<Schedule>

      constructor(private service:SharedServiceService,private router:Router,private route:ActivatedRoute){
        this.tokenService=new TokenService()
        this.ScheduleList=new Array<Schedule>()
        this.navigationService=new NavigationService<Schedule>(this.ScheduleList)
        this.deviceService=new DeviceService()
      }

      ngOnInit():void{
        this.route.queryParams.subscribe(params => {
          if (Object.keys(params).length === 0) {
            console.log('No query parameters');
            this.scheduleId=''
            this.enablethisschedule=false
            this.refreshScheduleList();

          } else if(params['scheduleId']=='SHNONE'){
            this.scheduleId='SHNONE'
            this.enablethisschedule=false
          }
          else {
            this.scheduleId = params['scheduleId'];
            this.enablethisschedule=true
            this.refreshScheduleList();
          }

          
        });
       
      }
  
      addClick(){
        // this.Schedule={
        //   sc:0,
        //   schedule_name:'',
        //   schedule_seq_no:0,
        //   created_date: '',
        //   lastUpdated_date:'',
        //   added_by:''
        // }

        this.router.navigate(['/schedule'], {
          queryParams: { scheduleId:'SHNONE'}
        });

        this.ModalTitle="Add Schedule"
        this.ActivateAddEditScheduleComp=true

        this.ScheduleList=new Array<Schedule>()        
        this.navigationService=new NavigationService<Schedule>(this.ScheduleList)

        
      }
  
      editClick(item: Schedule){
        this.Schedule=item
        this.ModalTitle="Edit Schedule"
        this.enableScheduleDetails(item.scheduleId)
      }
  
      deleteClick(ScheduleId:any){
        if(confirm('Are you sure ?')){
          
          // let val:ScheduleDto={
          //   schedule_id:ScheduleId,
          //   schedule_name:'',
          //   token_id:this.service.tokenService.returnToken()?.tokenId
          // }
  
          // this.service.deleteSchedule(val).subscribe((res)=>{
          //   alert(res.Data.toString());
          //   this.refreshScheduleList()
          // })
        }
        
      }
  
      closeClick(){
        this.ActivateAddEditScheduleComp=false
        this.refreshScheduleList()
        this.resetOptions()
      }
  
      refreshScheduleList(){
        this.ScheduleList=new Array<Schedule>()
        this.ScheduleListWithoutFilter=new Array<Schedule>()

        let selectedPage=this.navigationService.selectedPage
        this.navigationService=new NavigationService<Schedule>(this.ScheduleList)

        if(this.enablethisschedule==false){
          
            this.service.getAllSchedules().subscribe(res=>{

            for(let i=0;i<res.Data.length;i++){
              this.ScheduleList.push(res.Data[i])
              this.ScheduleListWithoutFilter.push(res.Data[i])
            }

            if(selectedPage!=undefined && selectedPage<=this.navigationService.getMaxPageNumber())
              this.navigationService.selectedPage=selectedPage
            else
              this.navigationService.selectedPage=1

            this.ActivateAddEditScheduleComp=false
            
            this.titleText='Click here to see more details'
          })

        }
        else{
          this.service.getSchedule(this.scheduleId).subscribe(res=>{

            for(let i=0;i<res.Data.length;i++){
              this.ScheduleList.push(res.Data[i])
              this.ScheduleListWithoutFilter.push(res.Data[i])
            }

            if(selectedPage!=undefined && selectedPage<=this.navigationService.getMaxPageNumber())
              this.navigationService.selectedPage=selectedPage
            else
              this.navigationService.selectedPage=1

            if(this.Schedule!=undefined)
              this.ActivateAddEditScheduleComp=true

            this.titleText='Click here to go back'
          
          })
         
          
        }
      }

      filterFn(){
        var FromStationFilter=this.FromStationFilter
        this.ScheduleList=new Array<Schedule>()
        
        this.navigationService=new NavigationService<Schedule>(this.ScheduleList)
        let schedule:Schedule[]
        
        if(this.selectedModel=='start'){
          schedule=this.ScheduleListWithoutFilter.filter(function(el:any){
            return el.startstation.toString().toLowerCase().includes(
              FromStationFilter.toString().trim().toLowerCase()
            )
          })
        }
        else if(this.selectedModel=='train'){
          schedule=this.ScheduleListWithoutFilter.filter(function(el:any){
            return el.train.toString().toLowerCase().includes(
              FromStationFilter.toString().trim().toLowerCase()
            )
          })
        }
        else{
          schedule=this.ScheduleListWithoutFilter.filter(function(el:any){
            return el.endstation.toString().toLowerCase().includes(
             FromStationFilter.toString().trim().toLowerCase()
            )
          })
        }

        for(let i=0;i<schedule.length;i++){
          this.ScheduleList.push(schedule[i])
        }

      }

      sortResult(prop:string){
        this.ScheduleList=new Array<Schedule>()
        
        this.navigationService=new NavigationService<Schedule>(this.ScheduleList)

        let schedule:Schedule[]=this.ScheduleListWithoutFilter.sort((a:any,b:any)=>{
            if(this.asc===true){
                return (a[prop]>b[prop])?1:((a[prop]<b[prop])?-1:0) //asc true
            }else{
              return (a[prop]<b[prop])?1:((a[prop]>b[prop])?-1:0)
            }
        })

        for(let i=0;i<schedule.length;i++){
          this.ScheduleList.push(schedule[i])
        }

        this.asc=!this.asc

        if(prop=='startstation'){
          this.startStation=true
          this.endStation=false
          this.train=false
        }
        else if(prop=='train'){
          this.startStation=false
          this.endStation=false
          this.train=true
        }
        else{
          this.startStation=false
          this.endStation=true
          this.train=false
        }

      }

      enableDisableApartmentForSchedule(i:number,schedule_id:number,schedule_seq_no:number){
        this.enableApartment=!this.enableApartment;
        // this.router.navigate(['/apartment'], {
        //   queryParams: { scheduleId: schedule_id, seqNo: schedule_seq_no}
        // });
      }

      
      enableScheduleDetails(schedule_id:string){
       
        //this.refreshScheduleList()
        

        this.router.navigate(['/schedule'], {
          queryParams: { scheduleId:schedule_id}
        });

        this.resetOptions()
      }

      resetOptions(){
        this.selectedModel='start'
        this.FromStationFilter=''

        this.asc=true

        this.startStation=false
        this.endStation=false
        this.train=false
      }

      bookSeats(item: Schedule){
        this.router.navigate(['/apartment'], {
          queryParams: { trainId:item.trainId, seqNo: item.trainSeqNo}
        });
      }

      toggleMoreDetails(rowNo:number) {
        rowNo=this.navigationService.getRealRowNum(rowNo)
        this.ScheduleList[rowNo].showRow=!this.ScheduleList[rowNo].showRow
      }
      
      getScheduleId(TrainNum:string){
        return 'SH' + TrainNum.slice(0,10)
      }
    
      getVisibleRows():Schedule[]{
        let visibleRows:Schedule[]= this.navigationService.getVisibleRows()
        return visibleRows
      }
    
      pageForward(){
        this.navigationService.pageForward()
      }
    
      pageBackward(){
        this.navigationService.pageBackward()
      }

      getbannerText(){
        if (this.ActivateAddEditScheduleComp==true && this.enablethisschedule==false) //Add new schedule
          return "Add journeys to the Schedule"
        else if (this.ActivateAddEditScheduleComp==true && this.enablethisschedule==true)
          return "Add more journeys to the Schedule"
        else
          return "Select a Schedule and edit <b>Or</b> Add a new Schedule"
      }
}
