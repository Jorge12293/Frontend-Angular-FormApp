import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-switches-page',
  templateUrl: './switches-page.component.html',
  styleUrls: ['./switches-page.component.css']
})
export class SwitchesPageComponent implements OnInit {

  public myForm:FormGroup = this.fb.group({
    gender: ['M',[Validators.required]],
    wantNotifications: [true,[Validators.required]],
    termsAndCondition: [false,[Validators.requiredTrue]]
  });

  public person = {
    gender:'F',
    wantNotifications:false
  }

  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.myForm.reset(this.person);
  }

  onSave():void {
    if(this.myForm.invalid){
      this.myForm.markAllAsTouched()
      return;
    }

    const {termsAndCondition, ...newPerson } = this.myForm.value;
    this.person = newPerson;
    console.log(this.myForm.value);
    console.log(this.person);
  }


  isValidField(field:string){
    return this.myForm.controls[field].errors &&
           this.myForm.controls[field].touched;
  }

  getFieldErrors(field:string) : string | null {
    if( !this.myForm.controls[field] && !this.myForm.controls[field].errors) return null;
    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)){
      switch(key){
          case 'required':
            return 'This is field is required';
          case 'minlength':
            return `Minium ${errors['minlength'].requiredLength} characters`;
          case 'min':
              return `Field must be greater than ${errors['min'].min} characters`;
        }
      }
    return '';
  }


}
