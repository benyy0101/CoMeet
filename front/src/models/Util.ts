export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: Boolean;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}
