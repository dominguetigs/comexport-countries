import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CountriesService } from './countries.service';

import { ICountry } from 'src/app/shared/interfaces/country.interface';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss'],
})
export class CountriesComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[];
  dataSource: MatTableDataSource<ICountry>;

  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {CountriesService} _countriesService
   */
  constructor(private _countriesService: CountriesService) {
    // Set the defaults
    this.displayedColumns = [
      'name',
      'capital',
      'region',
      'languages',
      'currencies',
      'population',
    ];

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
    this._countriesService.allCountriesChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((countries: ICountry[]) => {
        this.dataSource = new MatTableDataSource(countries);
      });
  }

  /**
   * After view init
   *
   * @returns {void}
   */
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
   * Apply filter
   *
   * @param {Event} event
   * @returns {void}
   */
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
