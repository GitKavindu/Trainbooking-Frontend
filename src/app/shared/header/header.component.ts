import { ChangeDetectorRef, Component } from '@angular/core';
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
  currentUrl!:string
  
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

  scrollToSection(section:string): void {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }


}
