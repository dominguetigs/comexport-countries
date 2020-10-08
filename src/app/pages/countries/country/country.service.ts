import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { forkJoin, Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { RestCountriesService } from 'src/app/core/services/rest-countries.service';

import { ICountry } from '../../../shared/interfaces/country.interface';

interface ICountryByRelationship {
  [key: string]: ICountry[];
}

@Injectable()
export class CountryService implements Resolve<any> {
  countryName: string;
  countryChanged: ReplaySubject<ICountry>;
  allCountriesRelatedByCurrencyChanged: ReplaySubject<ICountryByRelationship>;
  allCountriesRelatedByLanguageChanged: ReplaySubject<ICountryByRelationship>;

  /**
   * Constructor
   *
   * @param {RestCountriesService} _restCountriesService
   */
  constructor(private _restCountriesService: RestCountriesService) {
    // Set the private defaults
    this.countryChanged = new ReplaySubject();
    this.allCountriesRelatedByCurrencyChanged = new ReplaySubject();
    this.allCountriesRelatedByLanguageChanged = new ReplaySubject();
  }

  /**
   * Resolver
   *
   * @returns {Observable<any> | Promise<any> | any}
   */
  resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
    console.log(route);
    // this.countryName = route;
    return this.readByName().toPromise();
  }

  // -----------------------------------------------------------------------------------------------
  // Public methods
  // -----------------------------------------------------------------------------------------------

  /**
   * Get all countries
   *
   * @returns {Observable<ICountry[]>}
   */
  readByName(): Observable<ICountry> {
    return this._restCountriesService.readByName('').pipe(
      map((countries: ICountry[]) => {
        this.countryChanged.next(countries[0]);
        return countries[0];
      })
    );
  }

  /**
   * Read all countries by each specific currency code in list of currency codes
   *
   * @param {string[]} currencyCodes
   * @returns {ICountryByRelationship}
   */
  readByAllCurrencyCodes(
    currencyCodes: string[]
  ): Observable<ICountryByRelationship> {
    const requests = currencyCodes.map((currencyCode: string) =>
      this._restCountriesService.readByCurrencyCode(currencyCode)
    );
    return forkJoin(requests).pipe(
      map((countriesByCurrencyCode: ICountry[][]) =>
        this._groupByKey(currencyCodes, countriesByCurrencyCode)
      )
    );
  }

  /**
   * Read all countries by each specific language code in list of language codes
   *
   * @param {string[]} languageCodes
   * @returns {ICountryByRelationship}
   */
  readByAllLanguageCodes(
    languageCodes: string[]
  ): Observable<ICountryByRelationship> {
    const requests = languageCodes.map((languageCode: string) =>
      this._restCountriesService.readByLanguageCode(languageCode)
    );
    return forkJoin(requests).pipe(
      map((countriesByLanguageCode: ICountry[][]) =>
        this._groupByKey(languageCodes, countriesByLanguageCode)
      )
    );
  }

  // -----------------------------------------------------------------------------------------------
  // Private methods
  // -----------------------------------------------------------------------------------------------

  /**
   * Group by key
   *
   * @param {string[]} keys
   * @param {any[]} arr
   * @returns {{[key: string]: any[]}}
   */
  private _groupByKey(keys: string[], arr: any[]): { [key: string]: any[] } {
    let groupByKey = {};

    for (let i = 0; i < keys.length; i += 1) {
      groupByKey[keys[i]] = arr[i];
    }

    return groupByKey;
  }
}
