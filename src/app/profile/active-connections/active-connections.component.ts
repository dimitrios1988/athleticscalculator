import { Component, OnInit } from '@angular/core';
import { ActiveConnectionDto } from '../dto/active.connection.dto';
import { Observable } from 'rxjs';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-active-connections',
  templateUrl: './active-connections.component.html',
  styleUrls: ['./active-connections.component.scss']
})
export class ActiveConnectionsComponent implements OnInit {
  public isLoading: boolean;
  public activeConnections: ActiveConnectionDto[];

  constructor(private readonly profileService: ProfileService) {
    this.isLoading = false;
  }

  ngOnInit() {
    this.isLoading = true;
    this.profileService
      .getActiveConnections()
      .subscribe({
        next: (activeConnections: ActiveConnectionDto[]) =>
          (this.activeConnections = activeConnections)
      })
      .add(() => (this.isLoading = false));
  }

  onRevokeAccess(revokeButton, connectionToRevoke) {
    revokeButton.disabled = true;
    this.profileService.revokeAccess(connectionToRevoke.Uuid).subscribe({
      next: () => {
        this.activeConnections = this.arrayRemove(this.activeConnections, connectionToRevoke);
      }
    });
  }

  private arrayRemove(arr, value) {
    return arr.filter(function(ele) {
      return ele != value;
    });
  }
}
