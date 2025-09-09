import { Component } from '@angular/core';
import { SharedServiceService } from '../../shared-service.service';
import { GetUserStatusDto } from '../../../Models/DTOs/GetUserStatusDto';
import { ReturnUUserStatusDto } from '../../../Models/DTOs/ReturnUUserStatusDto';
import { AppointAdmin } from '../../../Models/DTOs/AppointAdmin';

@Component({
  selector: 'app-userpage',
  standalone: false,
  templateUrl: './userpage.component.html',
  styleUrl: './userpage.component.css'
})
export class UserpageComponent {

  selectedFilterType: any=1;
  selectedAccessType: any=0;
  selectedUserType: any=0;

  userFilter:string=""
  returnedUsers!:ReturnUUserStatusDto[]

  requestModel:GetUserStatusDto | null=null
  loadingBit:boolean=false

  constructor(private service:SharedServiceService){}

  filterFn(){
    let val:GetUserStatusDto={
      tokenId:this.service.tokenService.returnToken()?.tokenId,
      value:this.userFilter,
      columnId:this.selectedFilterType,
      IsAdmin:this.selectedAccessType,
      IsActive:this.selectedUserType      
    }
        
    this.requestModel=val
    this.loadingBit=true
    setTimeout(()=>{
      if(this.requestModel==null || this.compareGetUserStatusDtos(val)){

        this.service.GetUserStatus(val).subscribe((res)=>{
          this.returnedUsers=res.Data
          this.loadingBit=false
        })

      }
    },1000)
  }

  compareGetUserStatusDtos(val:GetUserStatusDto):boolean{
    if(val.tokenId==this.requestModel?.tokenId &&
       val.columnId==this.requestModel?.columnId &&
       val.value==this.requestModel.value &&
       val.IsAdmin==this.requestModel.IsAdmin &&
       val.IsActive==this.requestModel.IsActive
    )
      return true
    else
      return false
  }
  rowClick(rowNo: number) {
    this.returnedUsers[rowNo].showRow=!this.returnedUsers[rowNo].showRow
  }

  disableUser(username:string) {
    let val:AppointAdmin={
      userName:username,
      tokenId:this.service.tokenService.returnToken()?.tokenId,
      position:""
    }
    if(confirm('Are you sure to remove this user?')){
      this.service.disableUser(val).subscribe((res)=>{
        alert(res.Data)
      })
    }    
  }

  enableUser(username:string) {
    let val:AppointAdmin={
      userName:username,
      tokenId:this.service.tokenService.returnToken()?.tokenId,
      position:""
    }
   
    this.service.enableUser(val).subscribe((res)=>{
      alert(res.Data)
    })    
  }

  makeAdmin(username:string) {
    let val:AppointAdmin={
      userName:username,
      tokenId:this.service.tokenService.returnToken()?.tokenId,
      position:""
    }
   
    this.service.appointAdmin(val).subscribe((res)=>{
      alert(res.Data)
    }) 
  }

  disableAdmin(username:string) {
    let val:AppointAdmin={
      userName:username,
      tokenId:this.service.tokenService.returnToken()?.tokenId,
      position:""
    }
    if(confirm('Are you sure to remove this admin ?')){
      this.service.disableAdmin(val).subscribe((res)=>{
        alert(res.Data)
      })
    }
  }

  getLabelTextWhenNotHavingUsers():string{
    if(this.loadingBit==true)
      return "loading ...."
    else if(this.returnedUsers==undefined)
      return "Search for users"
    else
      return "No matching users"
  }
}
