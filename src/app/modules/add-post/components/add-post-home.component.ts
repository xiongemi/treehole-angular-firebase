import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { filter } from 'rxjs/operators';

import { markFormDeepDirty } from 'src/app/shared/services/form.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { HandleApiSuccess } from 'src/app/store/app.actions';
import {
  getLanguage,
  getUuid,
} from 'src/app/store/settings/settings.selectors';
import { SaveAddedPost } from '../store/add-post.actions';

@Component({
  selector: 'app-add-post-home',
  templateUrl: './add-post-home.component.html',
})
export class AddPostHomeComponent {
  addForm = new FormGroup({
    title: new FormControl(null, [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(200),
    ]),
    message: new FormControl(null, [
      Validators.required,
      Validators.minLength(50),
      Validators.maxLength(1000),
    ]),
  });

  isLoading = false;

  constructor(
    private store: Store,
    private location: Location,
    private modalService: ModalService
  ) {}

  savePost() {
    markFormDeepDirty(this.addForm);
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
          this.location.back();
          this.isLoading = false;
        });
    }
  }

  onCancel() {
    if (this.addForm.dirty) {
      this.modalService
        .cancelEditing()
        .pipe(filter(Boolean))
        .subscribe(() => {
          this.location.back();
        });
    } else {
      this.location.back();
    }
  }
}
