import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { map } from 'rxjs/operators';
import { TokenDTO } from '../dto/token.dto';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {

  public isLoading: boolean;
  public selectedScreen: string;
  public errorMessage: string;

  constructor(private activatedRoute: ActivatedRoute, router: Router, private authService: AuthService) {
    this.isLoading = true;
    const queryParams = activatedRoute.snapshot.queryParams;
    authService.confirmUserAccount(queryParams.email, queryParams.token)
      .subscribe({
        next: (token: TokenDTO) => {
          this.showScreen('success');
          authService.setToken(token);
          this.isLoading = false;
        },
        error: (err) => {
          if (err.error === 'USER_ALREADY_CONFIRMED') {
            this.errorMessage = 'Your account is already activated';
          } else {
            this.errorMessage = 'There was an error during activation';
          }
          this.showScreen('failed');
          this.isLoading = false;
        }
      }).add(() => setTimeout(() => router.navigate(['/']), 3000));
  }

  ngOnInit() { }

  showScreen(screen: string) {
    this.selectedScreen = screen;
  }
}
