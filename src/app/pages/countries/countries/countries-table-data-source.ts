import { DataSource } from '@angular/cdk/table';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { BehaviorSubject, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CountriesService } from './countries.service';

import { Utils } from '../../../core/utils/utils';

export class CountriesTableDataSource extends DataSource<any> {
  private _filterChange = new BehaviorSubject('');
  private _filteredDataChange = new BehaviorSubject('');

  /**
   * Constructor
   *
   * @param {CountriesService} _countriesService
   * @param {MatPaginator} _matPaginator
   * @param {MatSort} _matSort
   */
  constructor(
    private _countriesService: CountriesService,
    private _matPaginator: MatPaginator,
    private _matSort: MatSort
  ) {
    super();

    this.filteredData = this._countriesService.countries;
  }

  // --------------------------------------------------------------------------
  // @ Accessors
  // --------------------------------------------------------------------------

  // Filtered data
  get filteredData(): any {
    return this._filteredDataChange.value;
  }

  set filteredData(value: any) {
    this._filteredDataChange.next(value);
  }

  // Filter
  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  // --------------------------------------------------------------------------
  // @ Public methods
  // --------------------------------------------------------------------------

  /**
   * Connect function called by the table to retrieve one stream containing the data to render.
   *
   * @returns {Observable<any[]>}
   */
  connect(): Observable<any[]> {
    const displayDataChanges = [
      this._countriesService.allCountriesChanged,
      this._matPaginator.page,
      this._filterChange,
      this._matSort.sortChange,
    ];

    return merge(...displayDataChanges).pipe(
      map(() => {
        let data = this._countriesService.countries.slice();

        data = this.filterData(data);

        this.filteredData = [...data];

        data = this.sortData(data);

        // Grab the page's slice of data.
        const startIndex =
          this._matPaginator.pageIndex * this._matPaginator.pageSize;
        data = data.splice(startIndex, this._matPaginator.pageSize);

        return data;
      })
    );
  }

  /**
   * Filter data
   *
   * @param data
   * @returns {any}
   */
  filterData(data): any {
    if (!this.filter) {
      return data;
    }

    return Utils.filterArrayByString(data, this.filter);
  }

  /**
   * Sort data
   *
   * @param data
   * @returns {any[]}
   */
  sortData(data): any[] {
    if (!this._matSort.active || this._matSort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      if (this._matSort.active === 'name') {
        [propertyA, propertyB] = [a.name, b.name];
      } else if (this._matSort.active === 'capital') {
        [propertyA, propertyB] = [a.capital, b.capital];
      } else if (this._matSort.active === 'region') {
        [propertyA, propertyB] = [a.region, b.region];
      } else if (this._matSort.active === 'population') {
        [propertyA, propertyB] = [a.population, b.population];
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (
        (valueA < valueB ? -1 : 1) *
        (this._matSort.direction === 'asc' ? 1 : -1)
      );
    });
  }

  disconnect(): void {
    console.info('Disconnect');
  }
}
