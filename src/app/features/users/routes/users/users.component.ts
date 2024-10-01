import { Component, inject } from '@angular/core';
import { ToastsService } from '@services/toasts.service';
import { ToastVariants } from '@enums/toasts.enum';
import { UsersService } from '@users/services/users.service';
import { User } from '@interfaces/users.interface';

import { UserFormComponent } from '../../components/user-form/user-form.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [UserFormComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  private readonly toastService: ToastsService = inject(ToastsService);
  private readonly usersService: UsersService = inject(UsersService);

  get countries(): string[] {
    return this.usersService.countries;
  }

  onSaveUsers(users: User[]) {
    this.usersService.saveForms(users).subscribe({
      next: () => {
        this.toastService.show({
          body: `Users with names [${users.map(user => `"${user.username}"`).join(', ')}] was successfully saved.`,
          variant: ToastVariants.Success,
        });
      },
      error: () => {
        this.toastService.show({
          body: 'Could not save users, please try again later',
          variant: ToastVariants.Danger,
        });
      },
    });
  }
}
