import { platformBrowser } from '@angular/platform-browser';
import { MainModuleNgFactory } from '../../build/src/app/modules/main.module.ngfactory';

platformBrowser().bootstrapModuleFactory(MainModuleNgFactory);
