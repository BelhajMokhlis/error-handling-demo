import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { DataService } from './services/data.service';
import { ErrorService } from './services/error.service';
import { Observable, Subscription } from 'rxjs';
import { MaterialModule } from './material.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatButtonModule, MatCardModule, MaterialModule],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>APIs Publiques</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <div *ngIf="data$ | async as data; else errorTpl">
          <h3>{{ data.title }}</h3>
          <p>{{ data.content }}</p>
          <button mat-raised-button color="primary" (click)="retryLoad()">
            Charger une autre API
          </button>
        </div>
        <ng-template #errorTpl>
          <div class="error-container">
            <p class="error-message">{{ errorMessage }}</p>
            <button mat-raised-button color="primary" (click)="retryLoad()">
              Réessayer
            </button>
          </div>
        </ng-template>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .error-container {
      text-align: center;
      padding: 20px;
    }
    .error-message {
      color: #f44336;
      margin-bottom: 15px;
    }
    mat-card {
      max-width: 800px;
      margin: 20px auto;
      padding: 20px;
    }
    h3 {
      color: #1976d2;
      margin-bottom: 10px;
    }
    button {
      margin-top: 15px;
    }
  `]
})
export class AppComponent implements OnInit, OnDestroy {
  data$!: Observable<any>;
  errorMessage: string = '';
  private errorSubscription!: Subscription;

  constructor(
    private dataService: DataService,
    private errorService: ErrorService
  ) {}

  ngOnInit() {
    this.errorSubscription = this.errorService.error$.subscribe(
      message => this.errorMessage = message
    );
    this.loadData();
  }

  ngOnDestroy() {
    if (this.errorSubscription) {
      this.errorSubscription.unsubscribe();
    }
  }

  loadData() {
    this.data$ = this.dataService.getData();
  }

  retryLoad() {
    this.errorMessage = '';
    this.loadData();
  }
}
