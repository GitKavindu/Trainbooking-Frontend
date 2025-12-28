import { Component} from '@angular/core';
import { Location } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { SharedServiceService } from './shared-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {

  currentUrl: string;
  
  constructor(private router: Router,private location: Location,public service:SharedServiceService) {
    this.currentUrl=""
  }

  ngOnInit(): void {
    // Set the initial Url
    this.currentUrl = this.location.path();

    // Update currentUrl on every navigation end
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.currentUrl = this.location.path();
        console.log('Updated Url:', "m"+this.currentUrl);
      });
  }

 

}
