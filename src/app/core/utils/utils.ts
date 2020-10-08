export class Utils {
  static excludeBySpecificFieldValue(
    arr: any[],
    field: string,
    value: string
  ): any {
    return arr.filter(
      (obj: any) => obj[field].toLowerCase() !== value.toLowerCase()
    );
  }

  static mapFilterBySpecificField(arr: any, field: string): any[] {
    return arr.map((a) => a[field]).filter((a) => a);
  }
}
