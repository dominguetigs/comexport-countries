import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { forkJoin, Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Utils } from '../../../core/utils/utils';

import { RestCountriesService } from 'src/app/core/services/rest-countries.service';
import { ICurrency } from 'src/app/shared/interfaces/currency.interface';
import { ILanguage } from 'src/app/shared/interfaces/language.interface';

import { ICountry } from '../../../shared/interfaces/country.interface';
import { ICountryByRelationship } from '../../../shared/interfaces/country-by-relationship.interface';

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
    this.countryName = route?.params?.name;
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
    return this._restCountriesService.readByName(this.countryName).pipe(
      map((countries: ICountry[]) => {
        const country = countries[0];

        this.countryChanged.next(country);

        this.readByAllCurrencyCodes(
          country.currencies
            .map((currency: ICurrency) => currency.code)
            .filter((currencyCode: string) => currencyCode)
        ).toPromise();

        this.readByAllLanguageCodes(
          country.languages
            .map((language: ILanguage) => language.iso639_2)
            .filter((languageCode: string) => languageCode)
        ).toPromise();

        return country;
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
      map((countriesByCurrencyCode: ICountry[][]) => {
        const response = this._groupByKey(
          currencyCodes,
          countriesByCurrencyCode.map((countries: ICountry[]) =>
            Utils.excludeBySpecificFieldValue(
              countries,
              'name',
              this.countryName
            ).map((country: ICountry) => ({
              name: country.name,
              flag: country.flag,
            }))
          )
        );

        this.allCountriesRelatedByCurrencyChanged.next(response);

        return response;
      })
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
      map((countriesByLanguageCode: ICountry[][]) => {
        const response = this._groupByKey(
          languageCodes,
          countriesByLanguageCode.map((countries: ICountry[]) =>
            Utils.excludeBySpecificFieldValue(
              countries,
              'name',
              this.countryName
            ).map((country: ICountry) => ({
              name: country.name,
              flag: country.flag,
            }))
          )
        );

        this.allCountriesRelatedByLanguageChanged.next(response);

        return response;
      })
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

    for (let i = 0; i < keys?.length; i += 1) {
      groupByKey[keys[i]] = arr[i];
    }

    return groupByKey;
  }
}
