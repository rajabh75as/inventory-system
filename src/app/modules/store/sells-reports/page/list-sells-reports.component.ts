import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-list-hoses',
  templateUrl: './list-sells-reports.component.html'
})
export class ListSellsReportsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  onAdd() {
    this.router.navigate([`store/hoses/add`]);
  }
}

