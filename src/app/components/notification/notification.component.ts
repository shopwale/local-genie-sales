import { NotificationService } from './../../services/notification.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lgs-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  error$ = this.notificationService.errors$();

  constructor(private readonly notificationService: NotificationService) {}

  ngOnInit(): void {
  }

  close() {
    this.notificationService.showError();
  }


}
