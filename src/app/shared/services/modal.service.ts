import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';

interface CancelEditingTranslation {
  TITLE: string;
  CONTENT: string;
  YES: string;
  NO: string;
}

@Injectable()
export class ModalService {
  constructor(
    private modal: NzModalService,
    private tranlsateService: TranslateService
  ) {}

  cancelEditing(): Observable<boolean> {
    return this.tranlsateService.get('CANCEL_EDITING_MODAL').pipe(
      first(),
      switchMap((cancelModal: CancelEditingTranslation) => {
        return this.modal.confirm({
          nzTitle: cancelModal.TITLE,
          nzContent: cancelModal.CONTENT,
          nzOkText: cancelModal.NO, // keep editing
          nzCancelText: cancelModal.YES, // yes, don't save
          nzOnCancel: () => {
            return 1;
          },
          nzOnOk: () => {
            return 0;
          }
        }).afterClose;
      })
    );
  }
}
