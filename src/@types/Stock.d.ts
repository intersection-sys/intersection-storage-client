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
  rawMaterialId?: string;
  stockDestinies?: StockDestiny[];
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

interface QualityTest {
  id: string;
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

interface CreateStock {
  quantity: number;
  cost: number;
  batch: string;
  supplier: string;
  expirationDate: Date | string;
  rawMaterialId: string;
  companyId: string;
  invoiceNumber: string;
}

interface CreateStockDestiny {
  quantity: number;
  description: string;
  stockId: string;
  rawMaterialId: string;
  wasted?: boolean;
  productionOrderId?: string;
}

interface UpdateStockQualityTests{
  stock: {
    connect: {
      id: string;
    }
  };
  qualityTestFiles: FileList
}
