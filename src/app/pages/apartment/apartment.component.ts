import { Component, Input } from '@angular/core';
import { SharedServiceService } from '../../shared-service.service';
import { Apartment } from '../../../Models/Apartment';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '../../common/CommonService';
import { SeatModel } from '../../../Models/SeatModel';
import { Seat } from '../../../Models/Seat';
import { ApartmentDto } from '../../../Models/DTOs/ApartmentDto';
import { TokenService } from '../../common/TokenService';
import { DeviceService } from '../../common/DeviceService';
import { NavigationService } from '../../common/NavigationService';

@Component({
  selector: 'app-apartment',
  standalone: false,
  templateUrl: './apartment.component.html',
  styleUrl: './apartment.component.css'
})
export class ApartmentComponent {
  
  trainId:number
  trainSeqNo:number

  ApartmentList:Apartment[]
  ModalTitle!:string
  ActivateAddEditApartmentComp:boolean=false
  Apartment!:Apartment

  ApartmentIdFilter:string=""
  ApartmentNameFilter:string=""
  ApartmentListWithoutFilter:any=[]
  tokenService:TokenService

  deviceService:DeviceService
  navigationService:NavigationService<Apartment>

  constructor(private service:SharedServiceService,private route:ActivatedRoute){
    this.trainId=0
    this.trainSeqNo=0
    this.tokenService=new TokenService()

    this.ApartmentList=new Array<Apartment>()
    this.navigationService=new NavigationService<Apartment>(this.ApartmentList)
    this.deviceService=new DeviceService()
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
    var ApartmentIdFilter=this.ApartmentIdFilter
    var ApartmentNameFilter=this.ApartmentNameFilter

    this.ApartmentList=this.ApartmentListWithoutFilter.filter(function(el:Apartment){
      return el.Apartment_id.toString().toLowerCase().includes(
        ApartmentIdFilter.toString().trim().toLowerCase()
      )
      &&
      el.ApartmrntClass.toString().toLowerCase().includes(
        ApartmentNameFilter.toString().trim().toLowerCase()
      )
    })

    this.navigationService=new NavigationService<Apartment>(this.ApartmentList)
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
  


}
