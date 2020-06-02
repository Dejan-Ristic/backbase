import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.sass']
})
export class PopoverComponent {

  @Input() account: string;
  @Input() amount: number;
  @Output() select = new EventEmitter<boolean>();

  public cancel() {
    this.select.emit(false);
  }

  public confirm() {
    this.select.emit(true);
  }

}
