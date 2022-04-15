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
import { RecipeList } from '../interface/recipeInterface';
@Injectable({
  providedIn: 'root',
})
export class RecipeService {
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
  public getAllRecipe() {
    const url = `${environment.apiServer}/recipe`;
    return this.httpClient
      .get<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  /**
   * Create new recipe
   * @returns
   */
  public createRecipe(newRecipe: RecipeList) {
    const url = `${environment.apiServer}/recipe`;
    return this.httpClient
      .post<any>(url, newRecipe, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  /**
   * Update recipe
   * @returns
   */
  public updateRecipe(updateRecipe: RecipeList) {
    const url = `${environment.apiServer}/recipe/${updateRecipe.id}`;
    return this.httpClient
      .put<any>(url, updateRecipe, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  /**
   * Update recipe
   * @returns
   */
  public deleteRecipe(id: number) {
    const url = `${environment.apiServer}/recipe/${id}`;
    return this.httpClient
      .delete<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  /**
   * List all recipe
   * @returns
   */
  public searchRecipe(foodName: string) {
    const url = `${environment.apiServer}/recipe?q=${foodName}`;
    return this.httpClient
      .get<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): any {
    return throwError(error.error);
  }
}
