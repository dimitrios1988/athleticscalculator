import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CombinedEventEntity } from './entities/combined.event.entity';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Option } from './entities/option.entity';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class CombinedService {

  private baseUrl = '/combined';
  constructor(private httpClient: HttpClient) { }

  public getCombinedEvents(): Observable<CombinedEventEntity[]> {
    return this.httpClient.get<CombinedEventEntity[]>(environment.apiUrl + this.baseUrl);
  }

  public saveOptions(options: Option) {
    localStorage.setItem('combinedOptions', JSON.stringify(options));
  }

  public loadOptions(): Option {
    let savedOptions: Option = JSON.parse(localStorage.getItem('combinedOptions'));
    if (isNullOrUndefined(savedOptions)) {
      savedOptions = { selectedEvent: null, filtersPanelExpanded: true };
    }
    return savedOptions;
  }
}
