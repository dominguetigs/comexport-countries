import { NgModule } from '@angular/core';

import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  imports: [MatToolbarModule],
  exports: [MatToolbarModule],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },
  ],
})
export class AngularMaterialModule {}
