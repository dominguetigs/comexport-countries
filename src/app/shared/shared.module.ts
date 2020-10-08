import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularMaterialModule } from './angular-material.module';

import { AlphabetFilterModule } from 'alphabet-filter';

import { FlexLayoutModule } from '@angular/flex-layout';

import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [LoaderComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    AlphabetFilterModule,
    FlexLayoutModule,
  ],
  exports: [
    CommonModule,
    AngularMaterialModule,
    AlphabetFilterModule,
    FlexLayoutModule,

    LoaderComponent,
  ],
})
export class SharedModule {}
