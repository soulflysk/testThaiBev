import { Component, signal, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import QRCode from 'qrcode';

interface ProductCode {
  id: number;
  code: string;
}

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements AfterViewInit {
  protected readonly title = signal('product-code-manager');
  
  formattedProductCode: string = '';
  newProductCode: string = '';
  errorMessage: string = '';
  productCodes: ProductCode[] = [];
  showQRModal: boolean = false;
  showDeleteModal: boolean = false;
  deleteItemId: number | null = null;
  deleteItemCode: string = '';
  
  @ViewChild('qrCanvas') qrCanvas!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit() {
    // Initialize with some sample data
    this.productCodes = [
      { id: 1, code: 'ABC123-DEF456-GHI789-JKL012-MNO345-PQR678' },
      { id: 2, code: 'XYZ987-WUV654-RST321-OPQ098-LMN765-KJI432' }
    ];
  }

  onInputChange(event: any): void {
    let value = event.target.value.toUpperCase();
    
    // Remove all non-alphanumeric characters except dashes
    value = value.replace(/[^A-Z0-9-]/g, '');
    
    // Format the value with dashes
    const cleanValue = value.replace(/-/g, '');
    let formattedValue = '';
    
    for (let i = 0; i < cleanValue.length && i < 36; i++) {
      if (i > 0 && i % 6 === 0) {
        formattedValue += '-';
      }
      formattedValue += cleanValue[i];
    }
    
    this.formattedProductCode = formattedValue;
    this.newProductCode = formattedValue;
    
    // Validate the formatted input
    this.validateInput();
  }

  onKeyDown(event: KeyboardEvent): void {
    // Allow backspace, delete, tab, escape, enter
    if ([8, 9, 27, 13].indexOf(event.keyCode) !== -1) {
      return;
    }
    
    // Ensure it's a number or letter
    if (!/[A-Z0-9]/.test(event.key.toUpperCase())) {
      event.preventDefault();
    }
  }

  validateInput(): void {
    const code = this.newProductCode;
    
    if (!code) {
      this.errorMessage = '';
      return;
    }

    // Check format: xxxxxx-xxxxxx-xxxxxx-xxxxxx-xxxxxx-xxxxxx (36 characters total with dashes)
    const formatRegex = /^[A-Z0-9]{6}-[A-Z0-9]{6}-[A-Z0-9]{6}-[A-Z0-9]{6}-[A-Z0-9]{6}-[A-Z0-9]{6}$/;
    
    if (!formatRegex.test(code)) {
      this.errorMessage = ' ';
      return;
    }

    // Check for duplicates
    if (this.productCodes.some(item => item.code === code)) {
      this.errorMessage = 'รหัสสินค้าห้ามซ้ำกัน';
      return;
    }

    this.errorMessage = '';
  }

  isValidCode(): boolean {
    const code = this.newProductCode;
    const formatRegex = /^[A-Z0-9]{6}-[A-Z0-9]{6}-[A-Z0-9]{6}-[A-Z0-9]{6}-[A-Z0-9]{6}-[A-Z0-9]{6}$/;
    return formatRegex.test(code) && !this.productCodes.some(item => item.code === code);
  }

  addProductCode(): void {
    if (!this.isValidCode()) {
      return;
    }

    const newId = this.productCodes.length > 0 ? Math.max(...this.productCodes.map(item => item.id)) + 1 : 1;
    
    this.productCodes.push({
      id: newId,
      code: this.newProductCode
    });

    this.formattedProductCode = '';
    this.newProductCode = '';
    this.errorMessage = '';
  }

  showQRCode(code: string): void {
    this.showQRModal = true;
    
    setTimeout(() => {
      if (this.qrCanvas) {
        QRCode.toCanvas(this.qrCanvas.nativeElement, code, {
          width: 200,
          margin: 2
        });
      }
    }, 100);
  }

  closeQRModal(): void {
    this.showQRModal = false;
  }

  confirmDelete(id: number, code: string): void {
    this.deleteItemId = id;
    this.deleteItemCode = code;
    this.showDeleteModal = true;
  }

  deleteProductCode(): void {
    if (this.deleteItemId !== null) {
      this.productCodes = this.productCodes.filter(item => item.id !== this.deleteItemId);
      this.closeDeleteModal();
    }
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.deleteItemId = null;
    this.deleteItemCode = '';
  }
}
