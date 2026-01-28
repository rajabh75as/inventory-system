import {Directive, HostListener} from '@angular/core';

@Directive({
  selector: '[faCharOnly]',
})
export class FaCharOnlyDirective {
  @HostListener('input', ['$event'])
  onInputChange(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/^[a-zA-Z]$/g, '');
  }

}
