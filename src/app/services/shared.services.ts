import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedServices {
  humanDatetime(value: any): string {
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      return value;
    }
    return new Intl.DateTimeFormat("default", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date);
  }
}
