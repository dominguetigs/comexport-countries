import { NgModule } from '@angular/core';

import { CountriesRoutingModule } from './countries-routing.module';

import { CountriesService } from './countries/countries.service';

import { CountriesComponent } from './countries/countries.component';

@NgModule({
  declarations: [CountriesComponent],
  imports: [CountriesRoutingModule],
  providers: [CountriesService],
})
export class CountriesModule {}
