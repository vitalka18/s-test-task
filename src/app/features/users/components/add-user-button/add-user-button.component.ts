import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-user-button',
  standalone: true,
  imports: [NgbTooltipModule],
  templateUrl: './add-user-button.component.html',
  styleUrl: './add-user-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddUserButtonComponent {
  disabled = input<boolean>();
  clicked = output<void>();
}
