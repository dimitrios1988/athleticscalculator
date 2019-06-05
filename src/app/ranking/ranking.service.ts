import { Injectable } from "@angular/core";
import { EventEntity } from "./entities/event.entity";
import { Observable } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { GetPointsCmd } from './cmd/get-points.cmd';
import { GetPointsDto } from './dto/get-points.dto';
import { GetMeetingsDto } from './dto/get-meetings.dto';

@Injectable({
  providedIn: "root"
})
export class RankingService {
  private baseUrl = "https://athleticsranking.dimitrios1988.now.sh/ranking";
  constructor(private httpClient: HttpClient) {}

  public getEvents(): Observable<EventEntity[]> {
    return this.httpClient.get<EventEntity[]>(this.baseUrl+'/events');
  }

  public getMeetingCategories(groupId: number): Observable<string[]> {
    let params = new HttpParams();
    params = params.append('groupId', groupId.toString());
    return this.httpClient.get<string[]>(this.baseUrl+'/meetingcategories', {params: params});
  }

  public getPoints(data: GetPointsCmd): Observable<GetPointsDto> {
    return this.httpClient.post<GetPointsDto>(this.baseUrl+'/points', data);
  }

  public getMeetings(year: number, meetingcategories: string[]): Observable<GetMeetingsDto[]> {
    let params = new HttpParams();
    params = params.append('year', year.toString());
    params = params.append('categories', JSON.stringify(meetingcategories));
    return this.httpClient.get<GetMeetingsDto[]>(this.baseUrl + '/meetings', {params: params});
  }
}
