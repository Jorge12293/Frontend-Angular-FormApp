import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dynamic-page',
  templateUrl: './dynamic-page.component.html',
  styleUrls: ['./dynamic-page.component.css']
})
export class DynamicPageComponent implements OnInit {

  public myForm: FormGroup = this.fb.group({
    name : ['',[Validators.required,Validators.minLength(3)]],
    favoriteGames : this.fb.array([
      ['Metal Gear', Validators.required ],
      ['Death Stranding', Validators.required ]
    ])
  });

  public newFavorite:FormControl = new FormControl('',Validators.required)

  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {}

  get favoritesGames(): FormArray {
    return this.myForm.get('favoriteGames') as FormArray;
  }

  isValidField(field:string) : boolean | null {
    return this.myForm.controls[field].errors &&
           this.myForm.controls[field].touched;
  }

  getFieldErrors(field:string) : string | null {
    if( !this.myForm.controls[field] &&
        !this.myForm.controls[field].errors) return null;
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

  isValidFieldInArray(formArray:FormArray,index:number): boolean | null {
    return formArray.controls[index].errors &&
           formArray.controls[index].touched;
  }


  onAddToFavoriteArray():void{
    if(this.newFavorite.invalid) return;
    const newGame = this.newFavorite.value;
    this.favoritesGames.push(
      this.fb.control(newGame,Validators.required)
    );
    this.newFavorite.reset();
  }

  onDeleteFavoriteGames(index:number):void{
    this.favoritesGames.removeAt(index);
  }

  onSubmit():void {
    if(this.myForm.invalid){
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm.value);
    (this.myForm.controls['favoriteGames'] as FormArray) = this.fb.array([]);
    this.myForm.reset();
  }

}
