import { ICountry } from './country.interface';

export interface ICountryByRelationship {
  [key: string]: ICountry[];
}
