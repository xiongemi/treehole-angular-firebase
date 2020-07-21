import { NgModule } from '@angular/core';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzBackTopModule } from 'ng-zorro-antd/back-top';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

const modules = [
  NzButtonModule,
  NzCardModule,
  NzLayoutModule,
  NzMenuModule,
  NzPageHeaderModule,
  NzInputModule,
  NzFormModule,
  NzDropDownModule,
  NzIconModule,
  NzBadgeModule,
  NzListModule,
  NzTypographyModule,
  NzSelectModule,
  NzMessageModule,
  NzModalModule,
  NzPaginationModule,
  NzCommentModule,
  NzBackTopModule,
  NzDividerModule,
  NzAlertModule,
  NzResultModule
];

@NgModule({
  imports: modules,
  exports: modules
})
export class AntDesignModule {}
