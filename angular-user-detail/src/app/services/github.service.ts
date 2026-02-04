import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  private readonly API_BASE = 'https://api.github.com';

  constructor(private http: HttpClient) {}

  getUserByUsername(username: string): Observable<User> {
    return this.http
      .get<User>(`${this.API_BASE}/users/${username}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'An error occurred while fetching user data';

    if (error.error?.message) {
      errorMessage = error.error.message;
    } else if (error.status === 404) {
      errorMessage = 'User not found';
    } else if (error.status === 403) {
      errorMessage = 'API rate limit exceeded. Please try again later.';
    }

    return throwError(() => new Error(errorMessage));
  }
}
