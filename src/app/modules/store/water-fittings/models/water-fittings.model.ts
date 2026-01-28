export interface IWaterFitting {
  id?: number;
  code?: string;
  type?: string;
  sizeInch?: string;
  material?: string;
  description?: string;
  count?: number;
  enterPrice?: number;
  exitPrice?: number;
  shelf?: number;
  row?: number;
  column?: number;
}
export interface IWaterFittingsResponse {
  items?: IWaterFitting[];
  totalCount?: number;
}
export interface IWaterFittingsSearch {
  pageNumber?: number;
  pageSize?: number;
  code?: string;
  type?: string;
  sizeInch?: string;
  material?: string;
  orderBy?: any;
  isAsc?: any;
}
