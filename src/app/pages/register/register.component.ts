import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm!: FormGroup;
  nameParts: string[] = [];

  constructor(private fb: FormBuilder) {}

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
      password: ['', [Validators.required, Validators.minLength(6)]],
      retypePassword: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.registerForm.get('fullname')?.valueChanges.subscribe(value => {
      this.updateNameParts(value);
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      console.log('Form submitted:', this.registerForm.value);
      // handle registration here
    }
  }

  onClear(): void {

    this.registerForm.reset({
      fullname: '',
      preferredName: '',
      username: '',
      email: '',
      password: '',
      retypePassword: '',
      nationalId: ''
    });

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
