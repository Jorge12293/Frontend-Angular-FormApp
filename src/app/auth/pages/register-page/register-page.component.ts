import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/services/validators.service';
import { EmailValidator } from 'src/app/shared/validators/email-validator.service';
import * as customValidators from 'src/app/shared/validators/validators';

@Component({
  templateUrl: './register-page.component.html',
  styles: [
  ]
})
export class RegisterPageComponent implements OnInit {

  public myForm: FormGroup = this.fb.group({
    name: ['',[Validators.required, Validators.pattern(this.validatorService.firstNameAndLastNamePattern) ]],
    // email: [ '',[Validators.required, Validators.pattern(this.validatorService.emailPattern)], [new EmailValidator()]],
    email: [ '',[Validators.required, Validators.pattern(this.validatorService.emailPattern)], [this.emailValidator]],
    username: [ '', [ Validators.required, this.validatorService.cantBeStrider]],
    password: ['',[Validators.required,Validators.minLength(6)]],
    password2: ['',[Validators.required]],
  });

  constructor(
    private fb:FormBuilder,
    private validatorService:ValidatorsService,
    private emailValidator:EmailValidator,
  ) { }

  ngOnInit(): void {
  }

  isValidField(field:string): boolean|null {
    return this.validatorService.isValidField(this.myForm,field);
  }

  onSubmit(){
    this.myForm.markAllAsTouched();
  }

}

