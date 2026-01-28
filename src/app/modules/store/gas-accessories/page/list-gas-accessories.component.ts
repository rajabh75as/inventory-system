import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-list-gas-accessories',
  templateUrl: './list-gas-accessories.component.html'
})
export class ListGasAccessoriesComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  onAdd() {
    this.router.navigate([`store/gas-accessories/add`]);
  }
}

