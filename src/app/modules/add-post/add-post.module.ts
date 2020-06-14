import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AntDesignModule } from 'src/app/ant-design.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddPostRoutingModule } from './add-post-routing.module';
import { AddPostHomeComponent } from './components/add-post-home.component';
import { AddPostService } from './services/add-post.service';
import { AddPostState } from './store/add-post.state';
import { NgxsModule } from '@ngxs/store';

@NgModule({
  declarations: [AddPostHomeComponent],
  imports: [
    SharedModule,
    AddPostRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxsModule.forFeature([AddPostState])
  ],
  providers: [AddPostService]
})
export class AddPostModule {}
