export interface product {
    id: number;
    product_name: string;
    product_price: string;
    product_quantity: string;
    selectedItems?: number;
    
  }

  export interface product {
    // ... other properties ...
    showDeleteIcon: boolean;
  }