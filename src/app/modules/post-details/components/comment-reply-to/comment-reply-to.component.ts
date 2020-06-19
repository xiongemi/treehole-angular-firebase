import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-comment-reply-to',
  templateUrl: './comment-reply-to.component.html'
})
export class CommentReplyToComponent {
  @Output() saveComment = new EventEmitter<string>();
  @Output() cancel = new EventEmitter<void>();

  constructor(private store: Store) {}

  replyToFormGroup = new FormGroup({
    comment: new FormControl(null, [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(300)
    ])
  });

  onSubmit() {
    for (const i in this.replyToFormGroup.controls) {
      if (this.replyToFormGroup.controls.hasOwnProperty(i)) {
        this.replyToFormGroup.controls[i].markAsDirty();
        this.replyToFormGroup.controls[i].updateValueAndValidity();
      }
    }
    if (this.replyToFormGroup.valid) {
      this.saveComment.emit(this.replyToFormGroup.value.comment);
      this.replyToFormGroup.reset();
    }
  }

  onCancel() {
    this.cancel.emit();
  }
}
