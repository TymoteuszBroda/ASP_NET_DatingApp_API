import { Component, inject, input, OnInit, output} from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
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
    username: new FormControl(),
    password: new FormControl(),
    confirmPassword: new FormControl()
  })
}

  register()
  {
    this.accountService.register(this.model).subscribe({
      next: response => {
        console.log(response)
        this.cancel();
      },
      error: error=>{
        this.toaster.error(error.error)
      }

    })
  }

  cancel()
  {
    this.cancelRegister.emit(false);
  }
}
