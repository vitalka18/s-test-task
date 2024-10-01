import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { provideRouter, RouterOutlet } from '@angular/router';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

import { MockBackendInterceptor } from './shared/mock-backend/mock-backend.interceptor';
import { appRoutes } from './app.routes';
import { ToastsContainerComponent } from '@components/toasts-container/toasts-container.component';
import {
  NgbDateAdapter,
  NgbDateParserFormatter,
} from '@ng-bootstrap/ng-bootstrap';
import { AppDateParserFormatter } from '@services/ngb-date-formatter.service';
import { AppNgbDateAdapter } from '@services/ngb-date-adapter.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, RouterOutlet, ToastsContainerComponent],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(appRoutes),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MockBackendInterceptor,
      multi: true,
    },
    { provide: NgbDateParserFormatter, useClass: AppDateParserFormatter },
    { provide: NgbDateAdapter, useClass: AppNgbDateAdapter },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
