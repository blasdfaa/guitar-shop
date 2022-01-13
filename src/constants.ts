export enum APIEndpoint {
  Guitars = 'guitars',
}

export enum AppRoute {
  Home = '/',
}

export enum ActionCreator {
  FetchGuitarsWithParams = 'guitar/fetchGuitarsWithParams',
  FetchGuitarsByName = 'guitar/fetchGuitarsByName',
}

export enum FetchDataStatus {
  Idle = 'idle',
  Success = 'success',
  Failed = 'failed',
}

export enum ApiSearchParamKey {
  Type = 'type',
  StringsCount = 'stringCount',
  MinPrice = 'price_gte',
  MaxPrice = 'price_lte',
  Sorting = '_sort',
  Order = '_order',
  Page = '_page',
}

export enum FilterGuitarType {
  Acoustic = 'acoustic',
  Electric = 'electric',
  Ukulele = 'ukulele',
}

export enum SortOption {
  ByPrice = 'price',
  ByRating = 'rating',
}

export enum OrderOption {
  Up = 'asc',
  Down = 'desc',
}
