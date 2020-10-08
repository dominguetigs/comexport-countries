import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CountryService } from './country.service';

import { ICountry } from 'src/app/shared/interfaces/country.interface';
import { ICountryByRelationship } from '../../../shared/interfaces/country-by-relationship.interface';
import { ICurrency } from 'src/app/shared/interfaces/currency.interface';
import { ILanguage } from 'src/app/shared/interfaces/language.interface';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
})
export class CountryComponent implements OnInit, OnDestroy {
  allCountriesRelatedByCurrency: ICountryByRelationship;
  allCountriesRelatedByLanguage: ICountryByRelationship;
  country: ICountry;
  loading: number;
  hasCountriesByCurrency: boolean;
  hasCountriesByLanguage: boolean;

  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {CountryService} _countryService
   */
  constructor(private _countryService: CountryService) {
    // Set the defaults
    this.loading = 0;

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
    // Read a principal country
    this._countryService.countryChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((country: ICountry) => {
        this.loading = 0;
        this.loading += 1;
        this.country = country;
      });

    // Read all countries by currency code
    this._countryService.allCountriesRelatedByCurrencyChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((countriesByCurrencyCode: ICountryByRelationship) => {
        this.loading += 1;
        this.allCountriesRelatedByCurrency = countriesByCurrencyCode;
      });

    // Read all countries by language code
    this._countryService.allCountriesRelatedByLanguageChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((countriesByLanguageCode: ICountryByRelationship) => {
        this.loading += 1;
        this.allCountriesRelatedByLanguage = countriesByLanguageCode;
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
