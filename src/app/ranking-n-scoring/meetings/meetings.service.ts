import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { GetMeetingsDto } from "./dto/get-meetings.dto";
import { GetMeetingsDateRangeDto } from "./dto/getmeetingsdaterange.dto";
import { environment } from "../../../environments/environment";
import { Option } from './entities/option.entity';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: "root"
})
export class MeetingsService {
  private baseUrl = '/meetings';
  constructor(private httpClient: HttpClient) { }

  public getMeetings(
    year: number,
    meetingCategories: string[]
  ): Observable<GetMeetingsDto[]> {
    let params = new HttpParams();
    if (year != undefined) {
      params = params.append('year', year.toString());
    }
    params = params.append('categories', JSON.stringify(meetingCategories));
    return this.httpClient.get<GetMeetingsDto[]>(
      environment.apiUrl + this.baseUrl,
      {
        params: params
      }
    );
  }

  public getMeetingsDateRange(): Observable<GetMeetingsDateRangeDto> {
    return this.httpClient.get<GetMeetingsDateRangeDto>(
      environment.apiUrl + this.baseUrl + '/years'
    );
  }

  public getCountries(): Observable<string[]> {
    return this.httpClient.get<string[]>(
      environment.apiUrl + this.baseUrl + '/countries'
    );
  }

  public saveOptions(savedOptions: Option) {
    localStorage.setItem('meetingsOptions', JSON.stringify(savedOptions));
  }

  public loadOptions(): Option {
    let savedOptions: Option = JSON.parse(localStorage.getItem('meetingsOptions'));
    if (isNullOrUndefined(savedOptions)) {
      savedOptions = { filtersPanelExpanded: true };
    }
    return savedOptions;
  }
}
