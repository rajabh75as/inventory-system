export interface IAccessory {
  id?: number;
  code?: string;
  name?: string;
  type?: string;
  compatibleHoseSize?: string;
  description?: string;
  count?: number;
  enterPrice?: number;
  exitPrice?: number;
  shelf?: number;
  row?: number;
  column?: number;
}
export interface IAccessoriesResponse {
  items?: IAccessory[];
  totalCount?: number;
}
export interface IAccessoriesSearch {
  pageNumber?: number;
  pageSize?: number;
  code?: string;
  name?: string;
  type?: string;
  compatibleHoseSize?: string;
  orderBy?: boolean;
  isAsc?: boolean;
}
