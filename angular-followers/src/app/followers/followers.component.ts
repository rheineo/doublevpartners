import { Component, Input, OnInit, OnChanges, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable, BehaviorSubject, switchMap, of, catchError } from 'rxjs';
import { GithubService } from '../services/github.service';
import { Follower } from '../models/follower.model';

interface FollowersState {
  followers: Follower[];
  loading: boolean;
  error: string | null;
}

@Component({
  selector: 'app-followers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.scss'],
})
export class FollowersComponent implements OnInit, OnChanges {
  @Input() username: string = '';

  private route = inject(ActivatedRoute);
  private usernameSubject = new BehaviorSubject<string>('');

  state$: Observable<FollowersState>;

  constructor(private githubService: GithubService) {
    this.state$ = this.usernameSubject.pipe(
      switchMap((username) => {
        if (!username) {
          return of({ followers: [], loading: false, error: null });
        }

        return new Observable<FollowersState>((observer) => {
          observer.next({ followers: [], loading: true, error: null });

          this.githubService
            .getFollowers(username)
            .pipe(
              catchError((error) => {
                observer.next({
                  followers: [],
                  loading: false,
                  error: error.message,
                });
                return of([]);
              })
            )
            .subscribe((followers) => {
              if (followers.length > 0 || !observer.closed) {
                observer.next({ followers, loading: false, error: null });
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
}
