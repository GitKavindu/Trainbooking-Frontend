import { AfterViewInit, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TokenService } from '../../common/TokenService';
import { ActivatedRoute } from '@angular/router';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-common-details',
  standalone: false,
  templateUrl: './common-details.component.html',
  styleUrl: './common-details.component.css'
})
export class CommonDetailsComponent implements AfterViewInit{
  contactForm!: FormGroup
  errMessege:string=''
  tokenService:TokenService
  showSuccessMessage: boolean = false;


  constructor(
    private route: ActivatedRoute,
    private viewportScroller: ViewportScroller,
    private fb:FormBuilder
  ) {
    this.tokenService=new TokenService()
  }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      Subject: ['', Validators.required],   
      Comment: ['', [Validators.required, Validators.minLength(4)]]
    });
    
  }

  ngAfterViewInit() {
    // Delay to ensure view is rendered
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        setTimeout(() => {
          this.viewportScroller.scrollToAnchor(fragment);
        }, 100); // delay to wait for DOM/rendering
      }
    });
  }

  getControl(name: string): FormControl {
    return this.contactForm.get(name) as FormControl;
  }

  onClear(): void {

    this.contactForm.reset({
      username: '',
      password: ''
    });

    this.errMessege=''
  }

  onSubmit(): void {
    this.submitReview()
    this.onClear()
  }  

  submitReview() {
    this.showSuccessMessage = true;

    setTimeout(() => {
      this.showSuccessMessage = false;
    }, 3000);
  }  

     
}
