import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.sass']
})
export class PopoverComponent {

  @Input() account: string;
  @Input() amount: number;
  @Input() parent: any;

  public cancel() {
    this.parent.showPopover = false;
  }

  public confirm() {
    this.parent.completeTransaction();
  }

}
