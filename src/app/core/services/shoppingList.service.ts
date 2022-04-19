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
@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  private httpOptions = {
    headers: new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient, private router: Router) { }

  /**
   * List all recipe
   * @returns
   */
  public getAllShoppingList(limit: number) {
    const url = `${environment.apiServer}/shoppingList?_limit=${limit}`;
    return this.httpClient
      .get<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  /**
   * List all recipe
   * @returns
   */
  public searchAllShoppingList(limit: number, ingredientName: string) {
    const url = `${environment.apiServer}/shoppingList?q=${ingredientName}&&_limit=${limit}`;
    return this.httpClient
      .get<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  /**
 * List all recipe
 * @returns
 */
  public createIngredientShoppingList(arg: any) {
    const url = `${environment.apiServer}/shoppingList`;
    return this.httpClient
      .post<any>(url, arg, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  /**
* List all recipe
* @returns
*/
  public updateIngredientShoppingList(arg: any) {
    const url = `${environment.apiServer}/shoppingList/${arg.id}`;
    return this.httpClient
      .put<any>(url, arg, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  /**
* List all recipe
* @returns
*/
  public deleteIngredientShoppingList(id: number) {
    const url = `${environment.apiServer}/shoppingList/${id}`;
    return this.httpClient
      .delete<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): any {
    return throwError(error.error);
  }
}
