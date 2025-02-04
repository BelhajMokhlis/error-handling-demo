import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private errorSubject = new Subject<string>();
  error$ = this.errorSubject.asObservable();

  constructor(private snackBar: MatSnackBar) {}

  handleError(error: Error | HttpErrorResponse): void {
    let message = 'Une erreur inconnue est survenue.';

    if (error instanceof HttpErrorResponse) {
      // Erreur HTTP
      switch (error.status) {
        case 404:
          message = 'La ressource demandée n\'existe pas.';
          break;
        case 403:
          message = 'Vous n\'avez pas les droits nécessaires.';
          break;
        case 500:
          message = 'Erreur serveur. Veuillez réessayer plus tard.';
          break;
        default:
          message = `Erreur ${error.status}: ${error.statusText}`;
      }
    } else {
      // Erreur JavaScript
      message = error.message || message;
    }

    this.errorSubject.next(message);
    this.showError(message);
    console.error('Erreur détectée:', error);
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Fermer', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['error-snackbar']
    });
  }
}
