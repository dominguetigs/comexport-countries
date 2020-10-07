import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CountriesService } from './countries.service';

import { ICountry } from 'src/app/shared/interfaces/country.interface';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss'],
})
export class CountriesComponent implements OnInit, OnDestroy {
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {CountriesService} _countriesService
   */
  constructor(private _countriesService: CountriesService) {
    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  // -----------------------------------------------------------------------------------------------
  // Lifecycle hooks
  // -----------------------------------------------------------------------------------------------

  /**
   * On init
   *
   * @returns {void}
   */
  ngOnInit(): void {
    this._countriesService.allCountriesChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((countries: ICountry[]) => {
        console.log(countries);
      });
  }

  /**
   * On destroy
   *
   * @returns {void}
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
