import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { ItemService } from './services/item.service';
import { Item, DocumentStatus } from './models/item.model';
import { ApprovalModalComponent } from './components/approval-modal/approval-modal.component';
import { RejectionModalComponent } from './components/rejection-modal/rejection-modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet, ApprovalModalComponent, RejectionModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'approval-system';
  items: Item[] = [];
  selectedItems: number[] = [];
  showApprovalModal = false;
  showRejectionModal = false;

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.itemService.getItems().subscribe(data => {
      this.items = data;
    });
  }

  onItemSelect(itemId: number, event: any): void {
    const item = this.items.find(i => i.id === itemId);
    if (item && item.status === DocumentStatus.PENDING) {
      if (event.target.checked) {
        this.selectedItems.push(itemId);
      } else {
        this.selectedItems = this.selectedItems.filter(id => id !== itemId);
      }
    }
  }

  canApprove(): boolean {
    return this.selectedItems.length > 0;
  }

  canReject(): boolean {
    return this.selectedItems.length > 0;
  }

  onApproveClick(): void {
    if (this.canApprove()) {
      this.showApprovalModal = true;
    }
  }

  onRejectClick(): void {
    if (this.canReject()) {
      this.showRejectionModal = true;
    }
  }

  onApproveConfirm(reason: string): void {
    this.itemService.updateMultipleItemsStatus(
      this.selectedItems, 
      DocumentStatus.APPROVED, 
      reason
    ).subscribe(() => {
      this.loadItems();
      this.selectedItems = [];
      this.showApprovalModal = false;
    });
  }

  onRejectConfirm(reason: string): void {
    this.itemService.updateMultipleItemsStatus(
      this.selectedItems, 
      DocumentStatus.REJECTED, 
      reason
    ).subscribe(() => {
      this.loadItems();
      this.selectedItems = [];
      this.showRejectionModal = false;
    });
  }

  onModalCancel(): void {
    this.showApprovalModal = false;
    this.showRejectionModal = false;
  }

  isItemDisabled(item: Item): boolean {
    return item.status !== DocumentStatus.PENDING;
  }

  isItemSelected(itemId: number): boolean {
    return this.selectedItems.includes(itemId);
  }
}
