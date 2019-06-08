import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetMeetingsDto } from './dto/get-meetings.dto';

@Injectable({
  providedIn: 'root'
})
export class MeetingsService {

  private baseUrl = "http://127.0.0.1:3000/meetings";
  constructor(private httpClient: HttpClient) {}

  public getMeetings(year: number, meetingCategories: string[]): Observable<GetMeetingsDto[]> {
    let params = new HttpParams();
    params = params.append('year', year.toString());
    params = params.append('categories', JSON.stringify(meetingCategories));
    return this.httpClient.get<GetMeetingsDto[]>(this.baseUrl, {params: params});
  }
}
