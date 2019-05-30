import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetPerformancesDto } from './dto/get-performances.dto';
import { Observable } from 'rxjs';
import { GetPerformancesCmd } from './cmd/get-performances.cmd';

@Injectable({
  providedIn: 'root'
})
export class PerformancesService {

  private baseUrl = "https://athleticsranking.dimitrios1988.now.sh/performance";

  constructor(private httpClient: HttpClient) {}

  getPerformances(getPerformancesCmd: GetPerformancesCmd): Observable<GetPerformancesDto[]>{
    return this.httpClient.post<GetPerformancesDto[]>(this.baseUrl, getPerformancesCmd);
  }
}
