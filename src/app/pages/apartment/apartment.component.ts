import { Component, Input } from '@angular/core';
import { SharedServiceService } from '../../shared-service.service';
import { Apartment } from '../../../Models/Apartment';
import { ActivatedRoute } from '@angular/router';
import { Seat } from '../../../Models/Seat';
import { ApartmentDto } from '../../../Models/DTOs/ApartmentDto';
import { TokenService } from '../../common/TokenService';
import { DeviceService } from '../../common/DeviceService';
import { NavigationService } from '../../common/NavigationService';
import { CommonService } from '../../common/CommonService';
import { SeatModel } from '../../../Models/SeatModel';

@Component({
  selector: 'app-apartment',
  standalone: false,
  templateUrl: './apartment.component.html',
  styleUrl: './apartment.component.css'
})
export class ApartmentComponent {
  
  trainId:number
  trainSeqNo:number

  startJourneyId:number
  endJourneyId:number

  ApartmentList:Apartment[]
  ModalTitle!:string
  ActivateAddEditApartmentComp:boolean=false
  Apartment!:Apartment

  ApartmentIdFilter:string=""
  ApartmentClassFilter:string="All"
  ApartmentListWithoutFilter:any=[]
  tokenService:TokenService

  deviceService:DeviceService
  navigationService:NavigationService<Apartment>
  ApartmentClasses:string[]
  commonService:CommonService

  constructor(private service:SharedServiceService,private route:ActivatedRoute){
    this.trainId=0
    this.trainSeqNo=0

    this.startJourneyId=0
    this.endJourneyId=0

    this.tokenService=new TokenService()

    this.ApartmentList=new Array<Apartment>()
    this.navigationService=new NavigationService<Apartment>(this.ApartmentList)
    this.deviceService=new DeviceService()
    this.ApartmentClasses=['First','Second','Third']
    this.commonService=new CommonService()
  }
  
  ngOnInit():void{
    this.route.queryParams.subscribe(params => {
      if (Object.keys(params).length === 0) {
        console.log('No query parameters');
        this.trainId=0
        this.trainSeqNo=0
      } else {
        this.trainId = params['trainId'];
        this.trainSeqNo = +params['seqNo']; // + converts it to number
        this.startJourneyId=+params['startJourneyId']
        this.endJourneyId=+params['endJourneyId']
      }
      this.refreshApartmentList(this.trainId,this.trainSeqNo);
    });
    
  }

  addClick(){
    let seat:Seat[]=new Array()
    this.Apartment={
      Apartment_id:0,
      ApartmrntClass:'',
       seatModel: seat,
      created_date: '',
      lastUpdated_date:'',
      added_by:'',
      showRow:false
    }
    this.ModalTitle="Add Apartment"
    this.ActivateAddEditApartmentComp=true
  }

  editClick(item: Apartment){
    this.Apartment=item
    this.ModalTitle="Edit Apartment"
    this.ActivateAddEditApartmentComp=true
  }

  bookClick(item: Apartment){
    this.Apartment=item
    this.ModalTitle="Book Apartment"
    this.ActivateAddEditApartmentComp=true
    console.log('dsadsad')
  }

  deleteClick(ApartmentId:any){
    if(confirm('Are you sure ?')){
      
      let val:ApartmentDto={
        apartment_id:ApartmentId,
        _class:'',
        tokenId:this.service.tokenService.returnToken()?.tokenId,
        train_id:0,
        train_seq_no:0,
        seatModel:[]
    }

      this.service.deleteApartment(val).subscribe((res)=>{
        alert(res.Data.toString());
        this.refreshApartmentList(0,0)
      })
    }
    
  }

  closeClick(){
    this.ActivateAddEditApartmentComp=false
    this.refreshApartmentList(this.trainId,this.trainSeqNo)
  }

  refreshApartmentList(trainId:number, seqNo:number){
    this.ApartmentList=new Array<Apartment>()
    this.ApartmentListWithoutFilter=new Array<Apartment>()
    
    let selectedPage=this.navigationService.selectedPage
    this.navigationService=new NavigationService<Apartment>(this.ApartmentList)
    
    this.service.getAllApartments(trainId,seqNo).subscribe(res=>{

      for(let i=0;i<res.Data.length;i++){
        this.ApartmentList.push(res.Data[i])
        this.ApartmentListWithoutFilter.push(res.Data[i])
      }

      if(selectedPage!=undefined && selectedPage<=this.navigationService.getMaxPageNumber())
        this.navigationService.selectedPage=selectedPage
      else
        this.navigationService.selectedPage=1
    })

  }

  filterFn(){
    if(this.ApartmentClassFilter!="All"){

      var ApartmentClassFilter=this.ApartmentClassFilter
    
      this.ApartmentList=this.ApartmentListWithoutFilter.filter(function(el:Apartment){
        return el.ApartmrntClass.toString().toLowerCase().includes(
          ApartmentClassFilter.toString().trim().toLowerCase()
        )
      })

      this.navigationService=new NavigationService<Apartment>(this.ApartmentList)

    }
    else{
      this.refreshApartmentList(this.trainId,this.trainSeqNo)
    }
  }

  sortResult(prop:any,asc:boolean){
      this.ApartmentList=this.ApartmentListWithoutFilter.sort(function(a:any,b:any){
        if(asc){
            return (a[prop]>b[prop])?1:((a[prop]<b[prop])?-1:0)
        }else{
          return (a[prop]<b[prop])?1:((a[prop]>b[prop])?-1:0)
        }
      })
  }

  toggleMoreDetails(rowNo:number) {
    rowNo=this.navigationService.getRealRowNum(rowNo)
    this.ApartmentList[rowNo].showRow=!this.ApartmentList[rowNo].showRow
  }

  getApartmentId(TrainNum:number){
    return 'AP' + (TrainNum.toString().padStart(6, '0'))
  }

  getVisibleRows():Apartment[]{
    let visibleRows:Apartment[]= this.navigationService.getVisibleRows()
    return visibleRows
  }

  pageForward(){
    this.navigationService.pageForward()
  }

  pageBackward(){
    this.navigationService.pageBackward()
  }

  getTitleText():string{
   
    if(this.tokenService.getIsUserAdmin()==true){
      return "Select a Apartment and edit <b>Or</b> Add a new Apartment"
    }
    else{
      return "Select a Apartment to book seats"
    }
   
  }
  
  getAvailableSeatCount(seat:Seat[]):number{
    let seatCount=seat.length
    return seatCount
  }

  bookedSeatCount(apartmentId:number):number{
    let booedSeatCount=0
    this.service.selectBookedSeatsForJourney(this.startJourneyId,this.endJourneyId,apartmentId).subscribe((res)=>{
      booedSeatCount=res.Data.length
      return booedSeatCount
    })
    return booedSeatCount
  }


}
