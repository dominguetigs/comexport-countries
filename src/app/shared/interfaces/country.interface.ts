import { ICurrency } from './currency.interface';
import { ILanguage } from './language.interface';
import { IRegionalBlocs } from './regional-blocs.interface';

export interface ICountry {
  name: string;
  topLevelDomain: string[];
  alpha2Code: string;
  alpha3Code: string;
  callingCodes: string;
  capital: string;
  altSpellings: string[];
  region: string;
  subregion: string;
  population: number;
  latlng: [number, number];
  demonym: string;
  area: number;
  gini: number;
  timezones: string[];
  borders: string[];
  nativeName: string;
  numericCode: string;
  currencies: ICurrency[];
  languages: ILanguage[];
  translations: { [key: string]: string };
  flag: string;
  regionalBlocs: IRegionalBlocs[];
  cioc: string;
}
