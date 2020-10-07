import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { RestCountriesService } from 'src/app/core/services/rest-countries.service';

import { ICountry } from '../../../shared/interfaces/country.interface';

@Injectable()
export class CountriesService implements Resolve<any> {
  allCountriesChanged: ReplaySubject<ICountry[]>;

  /**
   * Constructor
   *
   * @param {HttpClient} _http
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
    console.log(12312313);
    return this.getAll().toPromise();
  }

  // -----------------------------------------------------------------------------------------------
  // Public methods
  // -----------------------------------------------------------------------------------------------

  /**
   * Get all countries
   *
   * @returns {Observable<ICountry[]>}
   */
  getAll(): Observable<ICountry[]> {
    return this._restCountriesService.getAll().pipe(
      map((countries: ICountry[]) => {
        this.allCountriesChanged.next(countries);
        return countries;
      })
    );
  }
}
