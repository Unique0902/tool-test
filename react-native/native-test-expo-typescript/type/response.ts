export type MedicineResponse = {
  id: number;
  name: string;
  company: string;
  imageUrl: string;
  containeds: {
    id: number;
    name: string;
    action: string;
    amount: number;
    unit: string;
  }[];
  types: {
    id: number;
    name: string[];
  }[];
  taboo: {
    id: number;
    name: string;
    description: string;
  }[];
  recommend: {
    id: number;
    name: string;
    icon: null;
    description: string;
    lackSymptoms: [];
    categorys: [];
  }[];
};
