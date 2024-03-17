import { Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() variant: string = 'primary';
  @Input() icon: string | undefined;
  @Input() iconPosition: 'left' | 'right' = 'right';
  @Input() isDisabled: boolean = false;
  @Input() fullwidth: boolean = false;
  @Input() short: boolean = false;
  @Input() loading: boolean = false;

  @Output() click: EventEmitter<MouseEvent> = new EventEmitter();

  onClick(ev: MouseEvent): void {
    ev.stopPropagation();
    this.click.emit(ev);
  }
}
