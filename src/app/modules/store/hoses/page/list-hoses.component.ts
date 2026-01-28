import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-list-hoses',
  templateUrl: './list-hoses.component.html'
})
export class ListHosesComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  onAdd() {
    this.router.navigate([`store/hoses/add`]);
  }
}

