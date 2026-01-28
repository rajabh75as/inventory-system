import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HydraulicFittingsService} from "../../services/hydraulic-fittings.service";

@Component({
  selector: 'app-display-hydraulic-fittings',
  templateUrl: './display-hydraulic-fittings.component.html',
  styleUrls: ['./display-hydraulic-fittings.component.scss']
})
export class DisplayHydraulicFittingsComponent implements OnInit {
  nationalNumber: string;

  constructor(private realCustomersService: HydraulicFittingsService,
              private activatedRoute: ActivatedRoute) {
    this.nationalNumber = activatedRoute.snapshot.params.id;
  }

  ngOnInit(): void {
  }
}
