export class Utils {
  /**
   * Exclude object by specific field value
   *
   * @param arr
   * @param field
   * @param value
   * @returns {any}
   */
  static excludeBySpecificFieldValue(arr, field, value): any {
    return arr.filter(
      (obj: any) => obj[field].toLowerCase() !== value.toLowerCase()
    );
  }

  /**
   * Create a new array by specific field
   *
   * @param arr
   * @param field
   * @returns {any[]}
   */
  static mapFilterBySpecificField(arr, field): any[] {
    return arr.map((a) => a[field]).filter((a) => a);
  }

  /**
   * Filter array by string
   *
   * @param mainArr
   * @param searchText
   * @returns {any}
   */
  static filterArrayByString(mainArr, searchText): any {
    if (searchText === '') {
      return mainArr;
    }

    searchText = searchText.toLowerCase();

    return mainArr.filter((itemObj) => this.searchInObj(itemObj, searchText));
  }

  /**
   * Search in object
   *
   * @param itemObj
   * @param searchText
   * @returns {boolean}
   */
  static searchInObj(itemObj, searchText): boolean {
    for (const prop in itemObj) {
      if (!itemObj.hasOwnProperty(prop)) {
        continue;
      }

      const value = itemObj[prop];

      if (typeof value === 'string') {
        if (this.searchInString(value, searchText)) {
          return true;
        }
      } else if (Array.isArray(value)) {
        if (this.searchInArray(value, searchText)) {
          return true;
        }
      }

      if (typeof value === 'object') {
        if (this.searchInObj(value, searchText)) {
          return true;
        }
      }
    }
  }

  /**
   * Search in array
   *
   * @param arr
   * @param searchText
   * @returns {boolean}
   */
  static searchInArray(arr, searchText): boolean {
    for (const value of arr) {
      if (typeof value === 'string') {
        if (this.searchInString(value, searchText)) {
          return true;
        }
      }

      if (typeof value === 'object') {
        if (this.searchInObj(value, searchText)) {
          return true;
        }
      }
    }
  }

  /**
   * Search in string
   *
   * @param value
   * @param searchText
   * @returns {any}
   */
  static searchInString(value, searchText): any {
    return value.toLowerCase().includes(searchText);
  }
}
