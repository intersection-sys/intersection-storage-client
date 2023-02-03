interface Stock {
  id: string;
  quantity: number;
  used: number;
  remaining: number;
  cost: number;
  batch: string;
  invoiceNumber: string;
  supplier: string;
  expirationDate: Date | string;
  qualityTests?: QualityTest[]
  rawMaterial?: Patial<RawMaterial>;
  stockDestinies?: StockDestiny[];
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

interface QualityTest {
  url: string;
  fileName: string;
}

interface StockDestiny {
  id: string;                
  quantity: number;          
  description: string;      
  productionOrderId?: string; 
  wasted?: boolean;            
  stock?: Partial<Stock>;         
  rawMaterial?: Parial<RawMaterial>;  
  createdAt?: Date | string;
  updatedAt?: Date | string;
}
