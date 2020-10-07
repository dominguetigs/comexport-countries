import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { SharedModule } from '../shared/shared.module';

import { LoaderService } from './services/loader.service';

import { LoaderInterceptor } from './interceptors/loader.interceptor';

import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [HeaderComponent],
  imports: [SharedModule],
  exports: [HeaderComponent],
  providers: [
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
  ],
})
export class CoreModule {}
