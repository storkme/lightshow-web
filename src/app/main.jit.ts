import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { MainModule } from './modules/main.module';
import { enableProdMode } from '@angular/core';

//declaring const from typescript..
declare const DEV_MODE: boolean;

if (!DEV_MODE) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(MainModule);
