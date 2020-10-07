import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularMaterialModule } from './angular-material.module';

import { AlphabetFilterModule } from 'alphabet-filter';

import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [LoaderComponent],
  imports: [CommonModule, AngularMaterialModule, AlphabetFilterModule],
  exports: [
    CommonModule,
    AngularMaterialModule,
    AlphabetFilterModule,
    LoaderComponent,
  ],
})
export class SharedModule {}
