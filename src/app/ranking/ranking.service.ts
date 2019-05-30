import { Injectable } from "@angular/core";
import { EventEntity } from "./entities/event.entity";
import { Observable } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { GetPointsCmd } from './cmd/get-points.cmd';
import { GetPointsDto } from './dto/get-points.dto';

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
}
