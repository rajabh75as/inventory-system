export interface IHydraulicFitting {
  id?: number;
  code?: string;
  threadType?: string;
  size?: string;
  angle?: string;
  gender?: string;
  material?: string;
  description?: string;
  count?: number;
  enterPrice?: number;
  exitPrice?: number;
  shelf?: number;
  row?: number;
  column?: number;
}
export interface IHydraulicFittingsResponse {
  items?: IHydraulicFitting[];
  totalCount?: number;
}
export interface IHydraulicFittingsSearch {
  pageNumber?: number;
  pageSize?: number;
  code?: string;
  threadType?: string;
  size?: string;
  angle?: string;
  gender?: string;
  material?: string;
  orderBy?: boolean;
  isAsc?: boolean;
}
