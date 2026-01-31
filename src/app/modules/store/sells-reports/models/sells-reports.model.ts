export interface ISellReport {
  id: number;
  itemCode: string;
  itemName: string;
  itemType: string;
  sellDate: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  profit: number;
}

export interface ISellReportsResponse {
  items: ISellReport[];
  totalCount: number;
}

export interface ISellReportsSearch {
  pageNumber?: number;
  pageSize?: number;
  fromDate?: string;
  toDate?: string;
  itemCode?: string;
  itemName?: string;
  itemType?: string;
  orderBy?: string;
  isAsc?: boolean;
}
