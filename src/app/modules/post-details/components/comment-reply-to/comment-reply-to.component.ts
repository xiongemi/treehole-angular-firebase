import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { filter } from 'rxjs/operators';
import { markFormDeepDirty } from 'src/app/shared/services/form.service';
import { ModalService } from 'src/app/shared/services/modal.service';

@Component({
  selector: 'app-comment-reply-to',
  templateUrl: './comment-reply-to.component.html',
  // tslint:disable-next-line: no-host-metadata-property
  host: { class: 'db' },
})
export class CommentReplyToComponent {
  @Output() saveComment = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  replyToFormGroup = new FormGroup({
    comment: new FormControl(null, [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(300),
    ]),
  });

  constructor(private modalService: ModalService) {}

  onSubmit() {
    markFormDeepDirty(this.replyToFormGroup);
    if (this.replyToFormGroup.valid) {
      this.saveComment.emit(this.replyToFormGroup.value.comment);
      this.replyToFormGroup.reset();
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
