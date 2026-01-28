import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {GasAccessoriesService} from "../../services/gas-accessories.service";

@Component({
  selector: 'app-display-gas-accessories',
  templateUrl: './display-gas-accessories.component.html',
  styleUrls: ['./display-gas-accessories.component.scss']
})
export class DisplayGasAccessoriesComponent implements OnInit {
  nationalNumber: string;

  constructor(private realCustomersService: GasAccessoriesService,
              private activatedRoute: ActivatedRoute) {
    this.nationalNumber = activatedRoute.snapshot.params.id;
  }

  ngOnInit(): void {
  }
}
