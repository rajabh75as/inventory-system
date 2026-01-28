import {Component} from '@angular/core';
import {ColorfulButtonCellModel} from "./colorful-button-cell.model";

@Component({
  selector: 'app-colorful-button-cell',
  template: `
    <p
      [style]="{'background-color': stateModel.style}">
      {{stateModel.value}}
    </p>`,
  styles: [`
    p {
      width: 120px;
      border-radius: 10px;
      text-align: center;
      color: white;
      padding: 2px
    }
  `]
})
export class ColorfulButtonCellComponent {

  public params!: ColorfulButtonCellModel;
  stateModel = {value: '', style: ''};

  agInit(params): void {
    this.params = params;
    this.stateModel = {
      value: this.params.value,
      style: this.params.color
    }
  }

  refresh(): boolean {
    return false;
  }
}
