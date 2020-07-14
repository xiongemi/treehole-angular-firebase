import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

import { Language } from './models/language.type';
import {
  GetUserDislikes,
  GetUserLikes,
  SetLanguage
} from './store/user/user.actions';
import { getLanguage } from './store/user/user.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  language$: Observable<Language>;

  today = Date.now();

  constructor(private store: Store) {}

  ngOnInit() {
    this.language$ = this.store.select(getLanguage);
    this.language$.pipe(first()).subscribe(language => {
      this.store.dispatch(new SetLanguage(language));
    });
    this.store.dispatch(new GetUserLikes());
    this.store.dispatch(new GetUserDislikes());
  }

  setLanguage(language: Language) {
    this.store.dispatch(new SetLanguage(language));
  }
}
