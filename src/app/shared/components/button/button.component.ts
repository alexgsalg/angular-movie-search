import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() variant: string = 'primary';
  @Input() icon: string | undefined;
  @Input() iconPosition: 'left' | 'right' = 'right';
  @Input() disabled: boolean = false;
  @Input() fullwidth: boolean = false;
  @Input() short: boolean = false;
  @Input() loading: boolean = false;

}
