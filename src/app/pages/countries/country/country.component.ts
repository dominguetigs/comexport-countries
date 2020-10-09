import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CountryService } from './country.service';

import { ICountry } from 'src/app/shared/interfaces/country.interface';
import { ICountryByRelationship } from '../../../shared/interfaces/country-by-relationship.interface';
import { ICurrency } from 'src/app/shared/interfaces/currency.interface';
import { ILanguage } from 'src/app/shared/interfaces/language.interface';
import { environment } from 'src/environments/environment';

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
  gmapUrl: string;

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
        this._setGMapUrlOptions();
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

  private _setGMapUrlOptions(): void {
    // Set initial url
    this.gmapUrl = 'https://maps.googleapis.com/maps/api/staticmap?';

    // Set lat and lng
    this.gmapUrl += `center=${this.country?.latlng[0]},${this.country?.latlng[1]}&`;

    // Set zoom
    this.gmapUrl += `zoom=${this.country?.name === 'Antarctica' ? '2' : '4'}&`;

    // Set size
    this.gmapUrl += `size=300x250&`;

    // Set api key
    this.gmapUrl += `key=${environment.gc_api_key}`;
  }
}
