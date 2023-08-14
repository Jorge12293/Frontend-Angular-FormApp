import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

const productInit = {
  name:'RTX 5090',
  price:2500,
  inStorage:6
}

@Component({
  templateUrl: './basic-page.component.html',
  styles: [
  ]
})
export class BasicPageComponent implements OnInit {

  // public myForm : FormGroup = new FormGroup({
  //   name: new FormControl(''),
  //   price: new FormControl(''),
  //   inStorage: new FormControl(''),
  // });

  public myForm:FormGroup = this.fb.group({
    name: ['', [Validators.required,Validators.minLength(3)]],
    price: [0, [Validators.required,Validators.min(0)]],
    inStorage: [0, [Validators.required,Validators.min(0)]],
  });

  constructor(
    private fb:FormBuilder
  ) { }

  ngOnInit(): void {
    // this.myForm.reset(productInit); // Init Values Form
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


  onSave(){
    if(this.myForm.invalid){
      this.myForm.markAllAsTouched();
      return;
    };

    console.log(this.myForm.value);
    // this.myForm.reset();
    this.myForm.reset({price:0,inStorage:0});
  }


}
