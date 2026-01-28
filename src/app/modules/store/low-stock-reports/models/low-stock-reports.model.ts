export interface ILowStockItem {
  itemId: number;
  category: string;
  itemName: string;
  stock: number;
  unit: string;
}

export interface ILowStockResponse {
  items: ILowStockItem[];
  totalCount: number;
}
