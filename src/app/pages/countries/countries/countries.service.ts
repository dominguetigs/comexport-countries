import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { RestCountriesService } from 'src/app/core/services/rest-countries.service';

import { ICountry } from '../../../shared/interfaces/country.interface';

import { Region } from '../../../shared/types/region.type';

@Injectable()
export class CountriesService implements Resolve<any> {
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
    return this.readAll().toPromise();
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
        this.allCountriesChanged.next(countries);
        return countries;
      })
    );
  }

  /**
   * Read all countries by region
   *
   * @param {Region} region
   * @returns {Observable<ICountry[]>}
   */
  readByRegion(region: Region): Observable<ICountry[]> {
    return this._restCountriesService.readByRegion(region).pipe(
      map((countries: ICountry[]) => {
        this.allCountriesChanged.next(countries);
        return countries;
      })
    );
  }
}
