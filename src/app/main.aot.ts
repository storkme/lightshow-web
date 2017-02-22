import { platformBrowser } from '@angular/platform-browser';
import { MainModuleNgFactory } from '../../build/src/app/modules/main.module.ngfactory';
import { enableProdMode } from '@angular/core';

//declaring const from typescript..
declare const DEV_MODE: boolean;

if (!DEV_MODE) {
  enableProdMode();
}

platformBrowser().bootstrapModuleFactory(MainModuleNgFactory);
