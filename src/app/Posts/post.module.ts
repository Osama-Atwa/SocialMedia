import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AngularMaterialModule } from '../angular-material.module';
import { CreatePostComponent } from './create-post/create-post.component';
import { PostsListComponent } from './posts-list/posts-list.component';

@NgModule({
  declarations: [CreatePostComponent, PostsListComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [],
})
export class PostModule {}
