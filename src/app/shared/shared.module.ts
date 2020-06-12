import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { AntDesignModule } from '../ant-design.module';
import { PostOverviewComponent } from './post-overview/post-overview.component';

@NgModule({
  imports: [AntDesignModule, CommonModule, TranslateModule],
  declarations: [PostOverviewComponent],
  exports: [
    AntDesignModule,
    CommonModule,
    TranslateModule,
    PostOverviewComponent
  ]
})
export class SharedModule {}
