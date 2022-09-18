import { AbstractControlDirective, AbstractControl, FormControl } from '@angular/forms';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'tn-form-error',
  template: `<ul class="r-ul" *ngIf="shouldShowErrors()">
  <li [class]="class" *ngFor="let error of listOfErrors()">{{error}}</li>
</ul>
  `,
  styles: [`.r-ul {list-style: none; margin-block-start: 0; padding-inline-start: 0;font-size: 80%; margin: 0} .r-c {color: red;}`]
})
export class TnFormErrorComponent {
  @Input('control') control: AbstractControl | AbstractControlDirective | FormControl |null;
  @Input('class') class: string = "r-c";
  @Input('field') field: string = "Field";
  @Input('msg') msg: string = "";

  constructor() {
    this.control = new FormControl();
  }

  shouldShowErrors(): null | boolean {
    return this.control &&
      this.control.errors &&
      (this.control.dirty || this.control.touched);
  }

  listOfErrors(): string[] | null {
    if (this.control && this.control.errors && Object.keys(this.control.errors).length)
      return Object.keys(this.control.errors)
        .map(field => this.getMessage(field, this.control && this.control.errors && this.control.errors[field] ? this.control.errors[field] : "", this.field, this.msg));
    return [];
  }

  private getMessage(type: any, params: any, field: string, msg: string = ""): string {
    switch (type) {
      case 'required': { return msg ? msg : field + ' can\'t be blank'}
      case 'minlength': { return msg ? msg : 'The min number of characters is ' + params.requiredLength}
      case 'maxlength': { return msg ? msg : 'The max allowed number of characters is ' + params.requiredLength}
      case 'pattern': { return msg ? msg : 'The required pattern is: ' + params.requiredPattern}
      case 'email': { return msg ? msg : params.message + ". Ex: " + params.example}
      case 'name': { return msg ? msg : params.message + ". Ex: " + params.example}
      case 'error': { return msg ? msg : params.message + ". Ex: " + params.example}
      case 'number': { return msg ? msg : params.message + ". Ex: " + params.example}
      case 'mobile': { return msg ? msg : params.message + ". Ex: " + params.example}
      case 'year': { return msg ? msg : params.message + ". Ex: " + params.example}
      case 'fulldate': { return msg ? msg : params.message + ". Ex: " + params.example}
      case 'passowrd': { return msg ? msg : params.message + ". Ex: " + params.example }
    }

    return ""
  }
}