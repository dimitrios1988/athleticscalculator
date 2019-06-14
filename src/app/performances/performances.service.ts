import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetPerformancesDto } from './dto/get-performances.dto';
import { Observable } from 'rxjs';
import { GetPerformancesCmd } from './cmd/get-performances.cmd';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PerformancesService {

  private baseUrl = "/performance";

  constructor(private httpClient: HttpClient) {}

  getPerformances(getPerformancesCmd: GetPerformancesCmd): Observable<GetPerformancesDto[]>{
    return this.httpClient.post<GetPerformancesDto[]>(environment.apiUrl + this.baseUrl, getPerformancesCmd);
  }
}
