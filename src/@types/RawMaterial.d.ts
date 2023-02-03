interface RawMaterial {
  id: string;
  name: string;
  unit: string;
  quantity: number;
  stocks?: Stock[];
}
