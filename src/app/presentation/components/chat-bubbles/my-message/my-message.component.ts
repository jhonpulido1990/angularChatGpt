import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-my-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-message.component.html',
  styleUrl: './my-message.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyMessageComponent {
  @Input({required: true}) text!: string;
}
