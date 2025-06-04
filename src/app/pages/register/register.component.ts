import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { RegisterUserDto } from '../../../Models/DTOs/RegisterUserDto';
import { SharedServiceService } from '../../shared-service.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm!: FormGroup;
  nameParts: string[] = [];
  messege!:string
  errMessege:string=''

  constructor(private fb: FormBuilder,private service:SharedServiceService) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      fullname: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[A-Z\s]*$/)
        ]
      ],
      preferedName: ['', Validators.required],
      nationalId: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(\d{11}|\d{9}V)$/)
        ]
      ],  
      mobileNo: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],    
      password: ['', [Validators.required, Validators.minLength(4)]],
      retypePassword: ['', [Validators.required, Validators.minLength(4)]]
    });

    this.registerForm.get('fullname')?.valueChanges.subscribe(value => {
      this.updateNameParts(value);
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      console.log('Form submitted:', this.registerForm.value,this.nameParts);
      // handle registration here

      let submitModel:RegisterUserDto={
        name: this.nameParts,
        mobileNo: this.getControl('mobileNo').value,
        nationalId:this.getControl('nationalId').value,
        email:this.getControl('email').value,
        userName:this.getControl('username').value,
        password:this.getControl('password').value,
        preferedName:this.getControl('preferedName').value
      };
      
      this.service.registerUser(submitModel).subscribe(res=>{
        this.messege=res.Data;
       },
       (err)=>{
        this.errMessege=err.error.Data
       }
      )
    }
  }

  onClear(): void {

    this.registerForm.reset({
      fullname: '',
      preferredName: '',
      username: '',
      email: '',
      mobileNo:'',
      password: '',
      retypePassword: '',
      nationalId: ''
    });

    this.errMessege=''
    this.nameParts=[];
  }

  getControl(name: string): FormControl {
    return this.registerForm.get(name) as FormControl;
  }

  onFullnameInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const cleaned = input.value.toUpperCase().replace(/[^A-Z\s]/g, '');
    this.getControl('fullname').setValue(cleaned, { emitEvent: true });
  }

  updateNameParts(fullname: string) {
    // Split the full name by whitespace and filter out empty strings)
    this.nameParts = fullname
      .trim()
      .split(/\s+/)
      .filter(part => part.length > 0);

  }
  
}
