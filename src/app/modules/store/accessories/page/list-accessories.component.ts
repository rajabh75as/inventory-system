import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-list-accessories',
  templateUrl: './list-accessories.component.html'
})
export class ListAccessoriesComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  onAdd() {
    this.router.navigate([`store/accessories/add`]);
  }
}

