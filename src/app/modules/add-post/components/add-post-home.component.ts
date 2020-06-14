import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { NzModalService } from 'ng-zorro-antd/modal';
import { first } from 'rxjs/operators';

import { getLanguage, getUuid } from 'src/app/store/user/user.selectors';
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
      Validators.minLength(50),
      Validators.maxLength(1000)
    ])
  });

  isLoading = false;

  constructor(
    private store: Store,
    private location: Location,
    private modal: NzModalService,
    private tranlsateService: TranslateService
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
          this.location.back();
          this.isLoading = false;
        });
    }
  }

  onCancel() {
    if (this.addForm.dirty) {
      this.tranlsateService
        .get('ADD.CANCEL_MODAL')
        .pipe(first())
        .subscribe(cancelModal => {
          this.modal.confirm({
            nzTitle: cancelModal.TITLE,
            nzContent: cancelModal.CONTENT,
            nzOkText: cancelModal.OK,
            nzCancelText: cancelModal.NO,
            nzOnOk: () => {
              this.location.back();
            }
          });
        });
    } else {
      this.location.back();
    }
  }
}
