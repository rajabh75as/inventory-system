import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[numbersOnly]'
})
export class OndyNumberDirective {

  constructor(private _el: ElementRef) {
  }



  @HostListener('keydown', ['$event']) onInputChange(event) {
    let charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57) && (charCode < 96 || charCode > 106)) {
      event.preventDefault();
    }
  }

}
