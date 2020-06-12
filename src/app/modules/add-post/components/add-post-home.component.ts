import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';

import { getLanguage, getUuid } from 'src/app/store/user/user.selectors';
import { AddPostService } from '../services/add-post.service';
import { SaveAddedPost } from '../store/add-post.actions';

@Component({
  selector: 'app-add-post-home',
  templateUrl: './add-post-home.component.html'
})
export class AddPostHomeComponent {
  addForm = new FormGroup({
    title: new FormControl(null, [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(200)
    ]),
    message: new FormControl(null, [
      Validators.required,
      Validators.minLength(100),
      Validators.maxLength(2000)
    ])
  });

  isLoading = false;

  constructor(
    private addPostService: AddPostService,
    private store: Store,
    private location: Location
  ) {}

  savePost() {
    for (const i in this.addForm.controls) {
      if (this.addForm.controls.hasOwnProperty(i)) {
        this.addForm.controls[i].markAsDirty();
        this.addForm.controls[i].updateValueAndValidity();
      }
    }
    if (this.addForm.valid) {
      this.isLoading = true;
      this.store
        .dispatch(
          new SaveAddedPost(
            this.addForm.value.title,
            this.addForm.value.message,
            this.store.selectSnapshot(getUuid),
            this.store.selectSnapshot(getLanguage)
          )
        )
        .subscribe(() => {
          this.isLoading = false;
        });
    }
  }

  onCancel() {
    this.location.back();
  }
}
