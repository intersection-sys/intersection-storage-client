interface RawMaterial {
  id: string;
  name: string;
  unit: string;
  quantity: number;
  stockLimit?: number;
  stocks?: Stock[];
}

interface CreateRawMaterial {
  name: string;
  unit: string;
  stockLimit: number;
  companyId: string;
}

interface UpdateRawMaterial {
  name?: string;
  unit?: string;
  stockLimit?: number;
}