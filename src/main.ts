import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { environment } from './environments/environment';
import { AppModule } from './app/app.module';
import { enableProdMode } from '@angular/core';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic([
  { provide: 'APP_ENVIRONMENT', useValue: environment } // Proporciona las variables de entorno al módulo raíz
]).bootstrapModule(AppModule)
  .catch(err => console.error(err));
