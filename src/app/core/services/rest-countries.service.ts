import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { ICountry } from 'src/app/shared/interfaces/country.interface';

@Injectable()
export class RestCountriesService {
  private _baseUrl: string;

  /**
   * Constructor
   *
   * @param {HttpClient} _http
   */
  constructor(private _http: HttpClient) {
    // Set the private defaults
    this._baseUrl = environment.baseUrl;
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
    return this._http.get<ICountry[]>(`${this._baseUrl}/all`);
  }
}
