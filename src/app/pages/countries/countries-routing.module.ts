import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CountriesService } from './countries/countries.service';

import { CountriesComponent } from './countries/countries.component';

const routes: Routes = [
  {
    path: '',
    component: CountriesComponent,
    resolve: {
      countries: CountriesService,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CountriesRoutingModule {}
