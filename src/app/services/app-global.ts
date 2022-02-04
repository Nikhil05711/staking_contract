import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
@Injectable()
export class Globals {

  currentAccount = '';

  setValue(val: string) {
    this.currentAccount = val;
  }
  getValue() {
    return this.currentAccount;
  }
}
