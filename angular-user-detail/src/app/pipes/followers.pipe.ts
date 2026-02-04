import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'followers',
  standalone: true,
})
export class FollowersPipe implements PipeTransform {
  transform(value: number | null | undefined): string {
    if (value === null || value === undefined) {
      return 'Sin seguidores';
    }

    if (value === 0) {
      return 'Sin seguidores';
    }

    if (value === 1) {
      return '1 seguidor';
    }

    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M seguidores`;
    }

    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K seguidores`;
    }

    return `${value.toLocaleString()} seguidores`;
  }
}
