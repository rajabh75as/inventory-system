import {Directive, HostListener} from '@angular/core';

@Directive({
  selector: '[enCharOnly]',
})
export class EnCharDirecrive {
  @HostListener('input', ['$event'])
  onInputChange(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^a-zA-Z@.]*/g, '');
  }
}
