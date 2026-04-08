export enum DocumentStatus {
  PENDING = 'รออนุมัติ',
  APPROVED = 'อนุมัติ',
  REJECTED = 'ไม่อนุมัติ'
}

export interface Item {
  id: number;
  name: string;
  reason: string;
  status: DocumentStatus;
}
