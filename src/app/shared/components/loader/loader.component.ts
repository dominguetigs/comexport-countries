import { Component } from '@angular/core';

import { Subject } from 'rxjs';

import { LoaderService } from '../../../core/services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent {
  isLoading: Subject<boolean>;

  /**
   * Constructor
   *
   * @param {LoaderService} _loaderService
   */
  constructor(private _loaderService: LoaderService) {
    // Set the defaults
    this.isLoading = this._loaderService.isLoading;
  }
}
