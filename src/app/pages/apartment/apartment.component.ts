import { Component, Input } from '@angular/core';
import { SharedServiceService } from '../../shared-service.service';
import { Apartment } from '../../../Models/Apartment';

@Component({
  selector: 'app-apartment',
  standalone: false,
  templateUrl: './apartment.component.html',
  styleUrl: './apartment.component.css'
})
export class ApartmentComponent {
  constructor(private service:SharedServiceService){
    this.trainId=0
    this.trainSeqNo=0
  }
        @Input() trainId:number
        @Input() trainSeqNo:number

        ApartmentList:Apartment[]=[]
        ModalTitle!:string
        ActivateAddEditApartmentComp:boolean=false
        Apartment!:Apartment
    
        ApartmentIdFilter:string=""
        ApartmentNameFilter:string=""
        ApartmentListWithoutFilter:any=[]
        ngOnInit():void{
          this.refreshApartmentList(this.trainId,this.trainSeqNo);
        }
    
        addClick(){
          // this.Apartment={
          //   apartment_no:0,
          //   apartment_name:'',
          //   apartment_seq_no:0,
          //   created_date: '',
          //   lastUpdated_date:'',
          //   added_by:''
          // }
          // this.ModalTitle="Add Apartment"
          // this.ActivateAddEditApartmentComp=true
        }
    
        editClick(item: Apartment){
          this.Apartment=item
          this.ModalTitle="Edit Apartment"
          this.ActivateAddEditApartmentComp=true
        }
    
        deleteClick(ApartmentId:any){
          // if(confirm('Are you sure ?')){
            
          //   let val:Apartment={
          //     Apartment_id:ApartmentId,
          //     Apartment_name:'',
          //     token_id:this.service.tokenService.returnToken()?.tokenId
          //   }
    
          //   this.service.deleteApartment(val).subscribe((res)=>{
          //     alert(res.Data.toString());
          //     this.refreshApartmentList()
          //   })
          // }
          
        }
    
        closeClick(){
          this.ActivateAddEditApartmentComp=false
          this.refreshApartmentList(this.trainId,this.trainSeqNo)
        }
    
        refreshApartmentList(trainId:number, seqNo:number){
          this.service.getAllApartments(trainId,seqNo).subscribe(res=>{
            this.ApartmentList=res.Data;
            this.ApartmentListWithoutFilter=res.Data
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
}
