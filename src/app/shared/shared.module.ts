import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { AntDesignModule } from '../ant-design.module';

@NgModule({
  exports: [AntDesignModule, CommonModule, TranslateModule]
})
export class SharedModule {}
