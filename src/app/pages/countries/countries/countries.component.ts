import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { fromEvent, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { CountriesService } from './countries.service';

import { CountriesTableDataSource } from './countries-table-data-source';

import { ICountry } from 'src/app/shared/interfaces/country.interface';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss'],
})
export class CountriesComponent implements OnInit, OnDestroy {
  @ViewChild(MatSort, { static: true })
  sort: MatSort;

  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator;

  @ViewChild('filter', { static: true })
  filter: ElementRef;

  countries: ICountry[];
  loading: boolean;
  regionCtrl = new FormControl();
  displayedColumns: string[];
  dataSource: CountriesTableDataSource | null;
  regions: string[];

  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {CountriesService} _countriesService
   */
  constructor(private _countriesService: CountriesService) {
    // Set the defaults
    this.displayedColumns = [
      'flag',
      'name',
      'capital',
      'region',
      'languages',
      'currencies',
      'population',
    ];
    this.loading = false;
    this.regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

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
    this.dataSource = new CountriesTableDataSource(
      this._countriesService,
      this.paginator,
      this.sort
    );

    fromEvent(this.filter?.nativeElement, 'keyup')
      .pipe(
        takeUntil(this._unsubscribeAll),
        debounceTime(150),
        distinctUntilChanged()
      )
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }

        if (
          !this.filter.nativeElement.value.length ||
          this.filter.nativeElement.value.length > 3
        ) {
          this.dataSource.filter = this.filter.nativeElement.value;
        }
      });

    this._countriesService.allCountriesChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((countries: ICountry[]) => {
        this.loading = false;
        this.countries = countries;
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

  // -----------------------------------------------------------------------------------------------
  // Public methods
  // -----------------------------------------------------------------------------------------------

  /**
   * Filter countries by region
   *
   * @returns {void}
   */
  filterByRegion(): void {
    this.loading = true;
    this._countriesService
      .readAllCountriesByRegion(this.regionCtrl.value)
      .toPromise();
  }
}
