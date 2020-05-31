import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.sass']
})
export class PopoverComponent implements OnInit {

  @Input() account: string;
  @Input() amount: number;

  ngOnInit(): void {

  }

}
