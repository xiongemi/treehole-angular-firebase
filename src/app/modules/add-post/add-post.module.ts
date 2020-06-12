import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AntDesignModule } from 'src/app/ant-design.module';
import { AddPostRoutingModule } from './add-post-routing.module';
import { AddPostHomeComponent } from './components/add-post-home.component';
import { AddPostService } from './services/add-post.service';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [AddPostHomeComponent],
  imports: [
    SharedModule,
    AddPostRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AddPostService]
})
export class AddPostModule {}
