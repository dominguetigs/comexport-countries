import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularMaterialModule } from './angular-material.module';

import { AlphabetFilterModule } from 'alphabet-filter';

import { FlexLayoutModule } from '@angular/flex-layout';

import { LoaderComponent } from './components/loader/loader.component';

import { JoinPipe } from './pipes/join.pipe';

@NgModule({
  declarations: [LoaderComponent, JoinPipe],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    AlphabetFilterModule,
    FlexLayoutModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    AlphabetFilterModule,
    FlexLayoutModule,

    LoaderComponent,

    JoinPipe,
  ],
})
export class SharedModule {}
