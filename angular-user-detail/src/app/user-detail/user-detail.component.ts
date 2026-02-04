import { Component, Input, OnInit, OnChanges, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable, BehaviorSubject, switchMap, of, catchError } from 'rxjs';
import { GithubService } from '../services/github.service';
import { User } from '../models/user.model';
import { FollowersPipe } from '../pipes/followers.pipe';

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule, FollowersPipe],
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit, OnChanges {
  @Input() username: string = '';

  private route = inject(ActivatedRoute);
  private usernameSubject = new BehaviorSubject<string>('');

  state$: Observable<UserState>;

  constructor(private githubService: GithubService) {
    this.state$ = this.usernameSubject.pipe(
      switchMap((username) => {
        if (!username) {
          return of({ user: null, loading: false, error: null });
        }

        return new Observable<UserState>((observer) => {
          observer.next({ user: null, loading: true, error: null });

          this.githubService
            .getUserByUsername(username)
            .pipe(
              catchError((error) => {
                observer.next({
                  user: null,
                  loading: false,
                  error: error.message,
                });
                return of(null);
              })
            )
            .subscribe((user) => {
              if (user) {
                observer.next({ user, loading: false, error: null });
              }
              observer.complete();
            });
        });
      })
    );
  }

  ngOnInit(): void {
    // Read from URL query params directly (for iframe integration)
    const urlParams = new URLSearchParams(window.location.search);
    const usernameFromUrl = urlParams.get('username');
    
    if (usernameFromUrl) {
      this.usernameSubject.next(usernameFromUrl);
    } else if (this.username) {
      this.usernameSubject.next(this.username);
    }

    // Also subscribe to route params for standalone usage
    this.route.queryParams.subscribe((params) => {
      const usernameFromQuery = params['username'];
      if (usernameFromQuery) {
        this.usernameSubject.next(usernameFromQuery);
      }
    });

    this.route.params.subscribe((params) => {
      const usernameFromRoute = params['username'];
      if (usernameFromRoute) {
        this.usernameSubject.next(usernameFromRoute);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['username'] && changes['username'].currentValue) {
      this.usernameSubject.next(changes['username'].currentValue);
    }
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
}
