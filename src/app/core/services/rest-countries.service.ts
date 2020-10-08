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
  readAll(): Observable<ICountry[]> {
    return this._http.get<ICountry[]>(`${this._baseUrl}/all`);
  }

  /**
   * Read country(ies) by name or patial name
   *
   * @param {string} name
   * @returns {Observable<ICountry[]>}
   */
  readByName(name: string): Observable<ICountry[]> {
    return this._http.get<ICountry[]>(`${this._baseUrl}/name/${name}`);
  }

  /**
   * Read country(ies) by region
   *
   * @param {string} region
   * @returns {Observable<ICountry[]>}
   */
  readByRegion(region: string): Observable<ICountry[]> {
    return this._http.get<ICountry[]>(`${this._baseUrl}/region/${region}`);
  }

  /**
   * Read country(ies) by currency code
   *
   * @param currencyCode
   * @returns {Observable<ICountry[]>}
   */
  readByCurrencyCode(currencyCode: string): Observable<ICountry[]> {
    return this._http.get<ICountry[]>(
      `${this._baseUrl}/currency/${currencyCode}`
    );
  }

  /**
   * Read country(ies) by language code
   *
   * @param languageCode
   * @returns {Observable<ICountry[]>}
   */
  readByLanguageCode(languageCode: string): Observable<ICountry[]> {
    return this._http.get<ICountry[]>(`${this._baseUrl}/lang/${languageCode}`);
  }
}
