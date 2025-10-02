import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TokenService } from '../../common/TokenService';

@Component({
  selector: 'app-common-details',
  standalone: false,
  templateUrl: './common-details.component.html',
  styleUrl: './common-details.component.css'
})
export class CommonDetailsComponent {
  contactForm!: FormGroup
  errMessege:string=''
  tokenService:TokenService
  showSuccessMessage: boolean = false;

  constructor(private fb:FormBuilder){
    this.tokenService=new TokenService()
  }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      Subject: ['', Validators.required],   
      Comment: ['', [Validators.required, Validators.minLength(4)]]
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
  }  

  submitReview() {
    this.showSuccessMessage = true;

    setTimeout(() => {
      this.showSuccessMessage = false;
    }, 3000);
  }
  

     
}
