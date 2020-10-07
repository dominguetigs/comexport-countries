import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

@Injectable()
export class LoaderService {
  isLoading = new Subject<boolean>();

  // -----------------------------------------------------------------------------------------------
  // Public methods
  // -----------------------------------------------------------------------------------------------

  /**
   * Show loader
   *
   * @returns {void}
   */
  show(): void {
    this.isLoading.next(true);
  }

  /**
   * Hide loader
   *
   * @returns {void}
   */
  hide(): void {
    this.isLoading.next(false);
  }
}
