export interface IHose {
  id?: number;
  code?: string;
  sizeInch?: string;
  standard?: string;
  brand?: string;
  application?: string;
  description?: string;
  metersInStock?: number;
  entryPricePerMeter?: number;
  exitPricePerMeter?: number;
  shelf?: number;
  row?: number;
  column?: number;
}
export interface IHosesResponse {
  items?: IHose[];
  totalCount?: number;
}
export interface IHosesSearch {
  pageNumber?: number;
  pageSize?: number;
  code?: string;
  sizeInch?: string;
  standard?: string;
  brand?: string;
  application?: string;
  orderBy?: boolean;
  isAsc?: boolean;
}
