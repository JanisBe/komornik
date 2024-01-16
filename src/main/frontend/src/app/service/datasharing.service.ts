import {Injectable, signal, WritableSignal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatasharingService {
  amount: WritableSignal<number> = signal(0);

  constructor() {
  }
}
