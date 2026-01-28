import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HosesService} from "../../services/hoses.service";

@Component({
  selector: 'app-display-hoses',
  templateUrl: './display-hoses.component.html',
  styleUrls: ['./display-hoses.component.scss']
})
export class DisplayHosesComponent implements OnInit {
  nationalNumber: string;

  constructor(private realCustomersService: HosesService,
              private activatedRoute: ActivatedRoute) {
    this.nationalNumber = activatedRoute.snapshot.params.id;
  }

  ngOnInit(): void {
  }
}
