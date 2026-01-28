export interface IGasAccessory {
  id?: number;
  code?: string;
  name?: string;
  type?: string;
  size?: string;
  material?: string;
  description?: string;
  count?: number;
  enterPrice?: number;
  shelf?: number;
  row?: number;
  column?: number;
}
export interface IGasAccessory {
  id?: number;
  code?: string;
  name?: string;
  type?: string;
  compatibleHoseSize?: string;
  size?: string;
  material?: string;
  description?: string;
  count?: number;
  enterPrice?: number;
  exitPrice?: number;
  shelf?: number;
  row?: number;
  column?: number;
}

export interface IGasAccessoriesResponse {
  items?: IGasAccessory[];
  totalCount?: number;
}

export interface IGasAccessorySearch {
  pageNumber: number;
  pageSize: number;
  code?: string;
  name?: string;
  type?: string;
  size?: string;
  material?: string;
}
