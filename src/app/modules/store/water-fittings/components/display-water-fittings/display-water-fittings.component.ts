import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {WaterFittingsService} from "../../services/water-fittings.service";

@Component({
  selector: 'app-display-water-fittings',
  templateUrl: './display-water-fittings.component.html',
  styleUrls: ['./display-water-fittings.component.scss']
})
export class DisplayWaterFittingsComponent implements OnInit {
  nationalNumber: string;

  constructor(private realCustomersService: WaterFittingsService,
              private activatedRoute: ActivatedRoute) {
    this.nationalNumber = activatedRoute.snapshot.params.id;
  }

  ngOnInit(): void {
  }
}
