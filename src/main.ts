import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import {LanguageService} from "@mehr/mehr-core";

if (environment.production) {
  enableProdMode();
}

const languageService: LanguageService = new LanguageService();

languageService.setLanguage().then((res: any) => {
  const providers = [
    {provide: LanguageService, useValue: languageService},
    {provide: 'AUTH_URL', useValue: environment.UserManagement},
  ];

  platformBrowserDynamic(providers).bootstrapModule(AppModule)
    .catch(err => console.error(err));
});
