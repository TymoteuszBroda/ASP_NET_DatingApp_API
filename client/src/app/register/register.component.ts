import { Component, inject, input, OnInit, output} from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  private accountService = inject(AccountService);
  private toaster = inject(ToastrService)
  cancelRegister = output<boolean>();
  model : any = {}
  registerForm: FormGroup = new FormGroup({});

ngOnInit(): void {
  this.initializeForm()
}

initializeForm(){
  this.registerForm = new FormGroup({
    username: new FormControl('Hello', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
    confirmPassword: new FormControl('', [Validators.required, this.matchValues('password')])
  });
  this.registerForm.controls['password'].valueChanges.subscribe({
    next: ()=> this.registerForm.controls['confirmPassword'].updateValueAndValidity()
  })
}

matchValues(matchTo: string): ValidatorFn{
  return (control: AbstractControl) => {
    return control.value === control.parent?.get(matchTo)?.value ? null : {isMatching: true}
  }
}

  register()
  {
    console.log(this.registerForm.value);
    // this.accountService.register(this.model).subscribe({
    //   next: response => {
    //     console.log(response)
    //     this.cancel();
    //   },
    //   error: error=>{
    //     this.toaster.error(error.error)
    //   }

    // })
  }

  cancel()
  {
    this.cancelRegister.emit(false);
  }
}
