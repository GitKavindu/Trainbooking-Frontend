import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { SharedServiceService } from '../../shared-service.service';
import { TokenService } from '../../common/TokenService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  
  tokenService:TokenService
  isDropdown:boolean=true
  path:string="home"
  fragment:string="our-quality"
  
  constructor(public service:SharedServiceService,private router:Router,  private cdRef: ChangeDetectorRef){
    this.tokenService=new TokenService()
  }

  public getProfileText():string | undefined{
    if(this.service.tokenService.returnToken()!=undefined){
      return this.service.tokenService.returnToken()?.PreferedName
    }

    return "Login / Register"
  }

  public logOut(){
    this.isDropdown=false
    this.tokenService.removeToken()
    this.router.navigate(['/login'])
    this.isDropdown=true
  }

  click(){
    
    console.log(this.tokenService.returnToken())
  }

}
