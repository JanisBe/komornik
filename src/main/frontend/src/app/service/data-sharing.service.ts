import {Injectable, signal, WritableSignal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  amount: WritableSignal<number> = signal(0);
  refreshGroups: WritableSignal<boolean> = signal(false);
  constructor() {
  }
}
