import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { Language } from './models/language.type';
import { SetLanguage } from './store/user/user.actions';
import { getLanguage } from './store/user/user.selectors';
import { first } from 'rxjs/operators';

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
  }

  setLanguage(language: Language) {
    this.store.dispatch(new SetLanguage(language));
  }
}
