import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { RateMeNagService } from "./rate-me-nag.service";

@Injectable({ providedIn: "root" })
export class RateMeNagInterceptor implements HttpInterceptor {
  constructor(private rateMeNagService: RateMeNagService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.method === "POST") {
      this.rateMeNagService.onRequestMade();
    }
    return next.handle(req);
  }
}
