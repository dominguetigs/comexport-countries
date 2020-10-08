import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CountriesService } from './countries/countries.service';
import { CountryService } from './country/country.service';

import { CountriesComponent } from './countries/countries.component';
import { CountryComponent } from './country/country.component';

const routes: Routes = [
  {
    path: '',
    component: CountriesComponent,
    resolve: {
      countries: CountriesService,
    },
  },
  {
    path: ':name',
    component: CountryComponent,
    resolve: {
      country: CountryService,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CountriesRoutingModule {}
