export const enum APIEndpoint {
  Guitars = 'guitars',
  Reviews = 'comments',
}

export const enum AppRoute {
  Home = '/',
  GuitarPage = '/:guitarId',
  Cart = '/cart',
  NotFound = '*',
}

export const enum ActionCreator {
  FetchGuitarsWithParams = 'guitar/fetchGuitarsWithParams',
  FetchGuitarsByName = 'guitar/fetchGuitarsByName',
  FetchProductById = 'product/fetchProductById',
  PostReview = 'product/postReview',
}

export const enum FetchDataStatus {
  Idle = 'idle',
  Success = 'success',
  Failed = 'failed',
}

export const enum ApiSearchParamKey {
  Type = 'type',
  StringsCount = 'stringCount',
  MinPrice = 'price_gte',
  MaxPrice = 'price_lte',
  Sorting = '_sort',
  Order = '_order',
  Page = '_page',
}

export const enum FilterGuitarType {
  Acoustic = 'acoustic',
  Electric = 'electric',
  Ukulele = 'ukulele',
}

export const enum SortOption {
  ByPrice = 'price',
  ByRating = 'rating',
}

export const enum OrderOption {
  Up = 'asc',
  Down = 'desc',
}
