import { AuthGuard } from './auth/auth.guard';

import { CreatePostComponent } from './Posts/create-post/create-post.component';
import { PostsListComponent } from './Posts/posts-list/posts-list.component';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
const routes: Route[] = [
  { path: '', component: PostsListComponent },
  { path: 'create', component: CreatePostComponent, canActivate: [AuthGuard] },
  {
    path: 'edit/:postid',
    component: CreatePostComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
