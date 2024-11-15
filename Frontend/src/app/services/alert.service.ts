import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private snackBar: MatSnackBar) {}

  showSuccessAlert(title: string, message: string){
    this.snackBar.open(`${title}: ${message}`, 'Close', {
      duration: 3000,
      panelClass: ['success-snackbar'],
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  showErrorAlert(title: string, message: string){
    this.snackBar.open(`${title}: ${message}`, 'Close', {
      duration: 3000,
      panelClass: ['error-snackbar'],
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }
}
