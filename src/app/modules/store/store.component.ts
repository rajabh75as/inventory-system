import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-store',
  styleUrls: ['./store.css'],
  templateUrl: './store.component.html'
})
export class StoreComponent implements OnInit {
  menuIsReady: boolean = false;
  versionFront = '0.0.1';
  versionBack = '1.0.0';
  menu: any[] = [];

  ngOnInit(): void {
    this.initMenu();
  }
  private initMenu(): void {
    this.menu = [
      {
        title: 'سایر قطعات',
        alias: 'accessories-management',
        path: '/store/accessories/page',
        icon: 'fa-cogs',
        hasSubMenu: false,
        subMenu: []
      },
      {
        title: 'لوازم گاز',
        alias: 'gas-accessories',
        path: '/store/gas-accessories/page',
        icon: 'fa-cogs',
        hasSubMenu: false,
        subMenu: []
      },
      {
        title: 'مدیریت شلنگ ها',
        alias: 'hoses-management',
        path: '/store/hoses/page',
        icon: 'fa-oil-can',
        hasSubMenu: false,
        subMenu: []
      },
      {
        title: 'مدیریت اتصالات',
        alias: 'fittings-management',
        path: '',
        icon: 'fa-sitemap',
        hasSubMenu: true,
        subMenu: [
          {
            title: 'اتصالات هیدرولیک',
            alias: 'hydraulic-fittings',
            path: '/store/hydraulic-fittings/page',
            icon: 'fa-circle-o',
            hasSubMenu: false,
            subMenu: []
          },
          {
            title: 'اتصالات آب',
            alias: 'water-fittings',
            path: '/store/water-fittings/page',
            icon: 'fa-circle-o',
            hasSubMenu: false,
            subMenu: []
          }
        ]
      },
      {
        title: 'گزارشات',
        alias: 'reports',
        path: '',
        icon: 'fa-bar-chart',
        hasSubMenu: true,
        subMenu: [
          {
            title: 'کالاهای رو به اتمام',
            alias: 'low-stock',
            path: '/store/low-stock-reports/page',
            icon: 'fa-exclamation-triangle',
            hasSubMenu: false,
            subMenu: []
          }
        ]
      }
    ];

    this.menuIsReady = true;
  }
}
