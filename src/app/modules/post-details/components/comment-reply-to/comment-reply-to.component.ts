import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { filter } from 'rxjs/operators';
import { markFormDeepDirty } from 'src/app/shared/services/form.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { getUuid } from 'src/app/store/user/user.selectors';
import { SaveComment } from '../../store/post-details.actions';

@Component({
  selector: 'app-comment-reply-to',
  templateUrl: './comment-reply-to.component.html'
})
export class CommentReplyToComponent {
  @Input() parentDocId: string;
  @Input() postId: string;
  @Output() saveComment = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  replyToFormGroup = new FormGroup({
    comment: new FormControl(null, [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(300)
    ])
  });

  constructor(private store: Store, private modalService: ModalService) {}

  onSubmit() {
    markFormDeepDirty(this.replyToFormGroup);
    if (this.replyToFormGroup.valid) {
      this.store
        .dispatch(
          new SaveComment(
            this.replyToFormGroup.value.comment,
            this.store.selectSnapshot(getUuid),
            this.parentDocId,
            this.postId
          )
        )
        .subscribe(() => {
          this.replyToFormGroup.reset();
          this.saveComment.emit();
        });
    }
  }

  onCancel() {
    if (this.replyToFormGroup.dirty) {
      this.modalService
        .cancelEditing()
        .pipe(filter(Boolean))
        .subscribe(() => {
          this.cancel.emit();
        });
    } else {
      this.cancel.emit();
    }
  }
}
