import { Directive, ElementRef, Input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[customLabel]'
})
export class CustomLabelDirective {

  private htmlElement?: ElementRef<HTMLElement>;
  private _color: string = 'red';
  private _errors?: ValidationErrors | null ;

  @Input()
  set color(value:string) {
    this._color = value;
    this.setStyle();
  }

  @Input()
  set errors( value: ValidationErrors | null | undefined ) {
    this._errors = value;
    this.setErrorMessage()
  }

  constructor(
    private el: ElementRef<HTMLElement>
  ) {
    console.log(el)
    this.htmlElement = el;
  }

  setStyle():void {
    if ( !this.htmlElement ) return;

    this.htmlElement.nativeElement.style.color = this._color;
  }

  setErrorMessage(): void {
    if ( !this.htmlElement ) return;
    if ( !this._errors ) {
      this.htmlElement.nativeElement.innerHTML = 'No hay errores'
      return;
    };

    const errors = Object.keys(this._errors);
    if ( errors.includes('required')) {
      this.htmlElement.nativeElement.innerHTML = 'Este campo es requerido';
      return;
    }

    if( errors.includes('minlength')){
      const min = this._errors!['minlength']['requiredLength'];
      const actual = this._errors!['minlength']['actualLength'];
      this.htmlElement.nativeElement.innerHTML = `Carácteres mínimo ${min}, carácteres actuales: ${ actual}`;
      return;

    }
    // this._errors = this.html
    if( errors.includes('email')){
      this.htmlElement.nativeElement.innerHTML = `Debe tener formato de email`;
      return;

    }
  }

}
