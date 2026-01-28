import {Directive, ElementRef, HostListener, OnInit} from '@angular/core';
import moment from "jalali-moment";

@Directive({
  selector: '[Date]'
})
export class DateDirective implements OnInit {
  constructor(private elementRef: ElementRef) {
  }
  ngOnInit() {
    debugger
    moment(this.elementRef.nativeElement).locale('fa').format('YYYY/MM/DD')
  }

  @HostListener('input', ['$event']) onInputChange(event) {
    debugger
    moment(event.data).locale('fa').format('YYYY/MM/DD')
  }

}
