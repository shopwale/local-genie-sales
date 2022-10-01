import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private readonly errorsSubject$ = new Subject<{ message: string, color: string }>();

  constructor() { }

  public errors$() {
    return this.errorsSubject$.asObservable();
  }

  public showError(message: string = ""): void {
    this.errorsSubject$.next({ message, color: "red" });
  }

  public showSucces(message: string): void {
    this.errorsSubject$.next({ message, color: "green" });
  }
}
