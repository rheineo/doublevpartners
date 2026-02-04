import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Follower } from '../models/follower.model';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  private readonly API_BASE = 'https://api.github.com';

  constructor(private http: HttpClient) {}

  getFollowers(username: string, page: number = 1, perPage: number = 30): Observable<Follower[]> {
    return this.http
      .get<Follower[]>(
        `${this.API_BASE}/users/${username}/followers?page=${page}&per_page=${perPage}`
      )
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'An error occurred while fetching followers';

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
