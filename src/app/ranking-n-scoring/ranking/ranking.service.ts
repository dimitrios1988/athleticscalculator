import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { EventEntity } from './entities/event.entity';
import { environment } from 'src/environments/environment';
import { GetPointsCmd } from './cmd/get-points.cmd';
import { GetPointsDto } from './dto/get-points.dto';
import { Option } from './entities/option.entity';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class RankingService {

  private baseUrl = '/ranking';
  constructor(private httpClient: HttpClient) { }

  public getEvents(): Observable<EventEntity[]> {
    return this.httpClient.get<EventEntity[]>(environment.apiUrl + this.baseUrl + '/events');
  }

  public getMeetingCategories(groupId: number): Observable<string[]> {
    let params = new HttpParams();
    params = params.append('groupId', groupId.toString());
    return this.httpClient.get<string[]>(environment.apiUrl + this.baseUrl + '/meetingcategories', { params });
  }

  public getPoints(data: GetPointsCmd): Observable<GetPointsDto> {
    return this.httpClient.post<GetPointsDto>(environment.apiUrl + this.baseUrl + '/points', data);
  }

  public saveOptions(savedOptions: Option) {
    localStorage.setItem('rankingOptions', JSON.stringify(savedOptions));
  }

  public loadOptions(): Option {
    let savedOptions: Option = JSON.parse(localStorage.getItem('rankingOptions'));
    if (isNullOrUndefined(savedOptions)) {
      savedOptions = { selectedEvent: null, filtersPanelExpanded: true };
    }
    return savedOptions;
  }
}
