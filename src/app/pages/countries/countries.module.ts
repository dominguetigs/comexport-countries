import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';

import { CountriesRoutingModule } from './countries-routing.module';

import { CountriesService } from './countries/countries.service';

import { CountriesComponent } from './countries/countries.component';

@NgModule({
  declarations: [CountriesComponent],
  imports: [CountriesRoutingModule, SharedModule],
  providers: [CountriesService],
})
export class CountriesModule {}
