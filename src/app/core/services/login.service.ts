import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { RecipeList } from '../model/recipe.model';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private httpOptions = {
    headers: new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient, private router: Router) {}

  /**
   * List all recipe
   * @returns
   */
  public getUser(arg: any) {
    const url = `${environment.apiServer}/users?username=${arg.username}&&password=${arg.password}`;
    return this.httpClient
      .get<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): any {
    return throwError(error.error);
  }
}
