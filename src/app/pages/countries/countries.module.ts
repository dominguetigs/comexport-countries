import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';

import { CountriesRoutingModule } from './countries-routing.module';

import { CountriesService } from './countries/countries.service';
import { CountryService } from './country/country.service';

import { CountriesComponent } from './countries/countries.component';
import { CountryComponent } from './country/country.component';

@NgModule({
  declarations: [CountriesComponent, CountryComponent],
  imports: [CountriesRoutingModule, SharedModule],
  providers: [CountriesService, CountryService],
})
export class CountriesModule {}
