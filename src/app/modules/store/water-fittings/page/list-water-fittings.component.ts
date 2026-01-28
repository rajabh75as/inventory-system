import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-list-water-fittings',
  templateUrl: './list-water-fittings.component.html'
})
export class ListWaterFittingsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  onAdd() {
    this.router.navigate([`store/water-fittings/add`]);
  }
}

