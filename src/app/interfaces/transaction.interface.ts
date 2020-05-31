export interface Transaction {
  amount: string | number;
  categoryCode: string;
  merchant: string;
  merchantLogo: string;
  transactionDate: number;
  transactionType: string;
}
