import { Injectable, TemplateRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr'; // Correct service from ngx-toastr

@Injectable({ providedIn: 'root' })
export class ToasterService {
  options: any;

  constructor(private toastr: ToastrService) {
    this.options = {
      closeButton: true,
      enableHTML: true,
      positionClass: 'toast-bottom-right',
      timeOut: 3000,
      progressBar: true,
    };
  }
  toasts: any[] = [];

  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
  this.toasts.push({ textOrTpl, ...options });
}

  async success(message: string, title?: string) {
    this.toastr.success(message, title, this.options);
  }

  error(message: string, title?: string): void {
    this.toastr.show(message, title, this.options);
  }

  info(message: string, title?: string): void {
    this.toastr.show(message, title, this.options);
  }

  warning(message: string, title?: string): void {
    this.toastr.show(message, title, this.options);
  }
}