import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-list-water-fittings',
  templateUrl: './list-hydraulic-fittings.component.html'
})
export class ListHydraulicFittingsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  onAdd() {
    this.router.navigate([`store/hydraulic-fittings/add`]);
  }
}

