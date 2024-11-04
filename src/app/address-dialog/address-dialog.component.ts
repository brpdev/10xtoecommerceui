import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-address-dialog',
  standalone: true,
  imports: [FormsModule, MatInputModule, MatDialogModule, NgIf], // Import FormsModule to use ngModel
  templateUrl: './address-dialog.component.html',
  styleUrls: ['./address-dialog.component.css']
})
export class AddressDialogComponent {
  addressLine1: string = '';
  addressLine2: string = '';
  city: string = '';
  state: string = '';
  postcode: string = '';

  constructor(private dialogRef: MatDialogRef<AddressDialogComponent>) {}

  onClose(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    const addressData = {
      addressLine1: this.addressLine1,
      addressLine2: this.addressLine2,
      city: this.city,
      state: this.state,
      postcode: this.postcode,
    };
    this.dialogRef.close(addressData);
  }
}