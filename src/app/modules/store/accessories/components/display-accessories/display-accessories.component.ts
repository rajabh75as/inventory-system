import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AccessoriesService} from "../../services/accessories.service";

@Component({
  selector: 'app-display-accessories',
  templateUrl: './display-accessories.component.html',
  styleUrls: ['./display-accessories.component.scss']
})
export class DisplayAccessoriesComponent implements OnInit {
  nationalNumber: string;

  constructor(private realCustomersService: AccessoriesService,
              private activatedRoute: ActivatedRoute) {
    this.nationalNumber = activatedRoute.snapshot.params.id;
  }

  ngOnInit(): void {
  }
}
