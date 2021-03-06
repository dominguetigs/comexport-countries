import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { forkJoin, Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { RestCountriesService } from 'src/app/core/services/rest-countries.service';

import { ICountry } from '../../../shared/interfaces/country.interface';

@Injectable()
export class CountriesService implements Resolve<any> {
  countries: ICountry[];

  allCountriesChanged: ReplaySubject<ICountry[]>;

  /**
   * Constructor
   *
   * @param {RestCountriesService} _restCountriesService
   */
  constructor(private _restCountriesService: RestCountriesService) {
    // Set the private defaults
    this.allCountriesChanged = new ReplaySubject();
  }

  /**
   * Resolver
   *
   * @returns {Observable<any> | Promise<any> | any}
   */
  resolve(): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {
      Promise.all([this.readAll().toPromise()]).then(() => {
        resolve();
      }, reject);
    });
  }

  // -----------------------------------------------------------------------------------------------
  // Public methods
  // -----------------------------------------------------------------------------------------------

  /**
   * Get all countries
   *
   * @returns {Observable<ICountry[]>}
   */
  readAll(): Observable<ICountry[]> {
    return this._restCountriesService.readAll().pipe(
      map((countries: ICountry[]) => {
        this.countries = countries;
        this.allCountriesChanged.next(this.countries);
        return this.countries;
      })
    );
  }

  /**
   * Read all countries by region(s)
   *
   * @param {string[]} regions
   * @returns {Observable<ICountry[]>}
   */
  readAllCountriesByRegion(regions: string[]): Observable<ICountry[]> {
    if (!regions?.length) {
      return this.readAll();
    }

    const requests = regions.map((region: string) =>
      this._restCountriesService.readByRegion(region)
    );

    return forkJoin(requests).pipe(
      map((countriesByRegion: ICountry[][]) => {
        this.countries = countriesByRegion.reduce(
          (currentValue, accumulator) => {
            return accumulator.concat(...currentValue);
          },
          []
        );

        this.allCountriesChanged.next(this.countries);

        return this.countries;
      })
    );
  }
}
