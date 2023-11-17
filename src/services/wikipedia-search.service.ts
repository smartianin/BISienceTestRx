import { Injectable } from '@angular/core';
import {Observable, debounceTime, distinctUntilChanged, switchMap, from, tap, map, filter} from "rxjs";

@Injectable()
export class WikipediaSearchService {
  mockStream: Observable<string>;
  constructor() {
    this.mockStream = from(['One', 'Two', 'Three']);
  }

  search(terms: Observable<string>, debounceMs: number = 400): Observable<Observable<string>> {
    return terms.pipe(
      debounceTime(debounceMs),
      distinctUntilChanged(),
      switchMap((term: string) => this.draftSearch(term))
    );
  }

  async draftSearch(term: string): Promise<Observable<string>> {
    return this.mockStream.pipe(
      tap((res) => {
        console.log('res', res);
        console.log('term', term);
      }),
      filter((res: string): boolean => res === term)
    );
  }
}
