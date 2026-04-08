import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Item, DocumentStatus } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private mockItems: Item[] = [
    { id: 1, name: 'เอกสารขออนุมัติการลางาน', reason: 'ลาป่วย', status: DocumentStatus.PENDING },
    { id: 2, name: 'เอกสารขออนุมัติการทำงานล่วงเวลา', reason: 'ต้องการทำโปรเจค', status: DocumentStatus.APPROVED },
    { id: 3, name: 'เอกสารขออนุมัติการใช้รถยนต์', reason: 'เดินทางไปต่างจังหวัด', status: DocumentStatus.PENDING },
    { id: 4, name: 'เอกสารขออนุมัติการจัดงาน', reason: 'จัดงานประชุมสามัญ', status: DocumentStatus.REJECTED },
    { id: 5, name: 'เอกสารขออนุมัติการซื้ออุปกรณ์', reason: 'ซื้อคอมพิวเตอร์ใหม่', status: DocumentStatus.PENDING },
    { id: 6, name: 'เอกสารขออนุมัติการฝึกอบรม', reason: 'อบรมหลักสูตรการบริหาร', status: DocumentStatus.APPROVED },
    { id: 7, name: 'เอกสารขออนุมัติการเปลี่ยนแปลงเวลาทำงาน', reason: 'ปรับเวลาทำงานชั่วคราว', status: DocumentStatus.PENDING },
    { id: 8, name: 'เอกสารขออนุมัติการจ้างงานพิเศษ', reason: 'จ้างพนักงานชั่วคราว', status: DocumentStatus.PENDING },
    { id: 9, name: 'เอกสารขออนุมัติการปรับปรุงอาคาร', reason: 'ซ่อมแซมอาคารสำนักงาน', status: DocumentStatus.REJECTED },
    { id: 10, name: 'เอกสารขออนุมัติการจัดซื้อ', reason: 'จัดซื้อวัสดุสำนักงาน', status: DocumentStatus.APPROVED }
  ];

  getItems(): Observable<Item[]> {
    return of(this.mockItems);
  }

  updateMultipleItemsStatus(itemIds: number[], status: DocumentStatus, reason: string): Observable<Item[]> {
    itemIds.forEach(id => {
      const item = this.mockItems.find(i => i.id === id);
      if (item) {
        item.status = status;
        item.reason = reason;
      }
    });
    return of(this.mockItems);
  }
}
