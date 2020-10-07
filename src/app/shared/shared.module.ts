import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularMaterialModule } from './angular-material.module';

import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [LoaderComponent],
  imports: [CommonModule, AngularMaterialModule],
  exports: [CommonModule, AngularMaterialModule, LoaderComponent],
})
export class SharedModule {}
