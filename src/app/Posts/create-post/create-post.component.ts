import { post } from './../post.model';

import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../post.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { mimeType } from './mime-type.validator';
@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent implements OnInit {
  private Mode: string = 'Create';
  private ID!: string;
  isLoading: boolean = true;
  ImagePreview!: string;
  Post: post = { id: '', title: '', content: '', imagePath: '', creator: '' };
  form!: FormGroup;
  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      }),
      content: new FormControl(null, {
        validators: [Validators.required],
      }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType],
      }),
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.isLoading = true;
      if (paramMap.has('postid')) {
        this.Mode = 'Edit';
        this.ID = paramMap.get('postid')!;
        this.postService.GetPost(this.ID).subscribe((result) => {
          this.Post = {
            id: result._id,
            title: result.title,
            content: result.content,
            imagePath: result.imagePath,
            creator: result.creator,
          };
          this.isLoading = false;
          this.form.setValue({
            title: this.Post.title,
            content: this.Post.content,
            image: this.Post.imagePath,
          });
        });
      } else {
        this.Mode = 'Create';
        this.ID = '';
        this.isLoading = false;
      }
    });
  }

  onImagePicked(event: Event) {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    this.form.patchValue({ image: file });
    this.form.get('image')?.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.ImagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  OnSavePost() {
    if (this.form.invalid) {
      return;
    }

    if (this.Mode === 'Create') {
      // let post:post = {
      //   id:"",
      //   title:this.form.value.title,
      //   content:this.form.value.content,
      //   imagePath:''
      // };
      this.postService.SetPost(
        this.form.value.title,
        this.form.value.content,
        this.form.value.image
      );
      this.router.navigate(['/']);
    } else if (this.Mode === 'Edit') {
      console.log(this.Post);
      this.postService.UpdatePost(
        this.Post.id,
        this.form.value.title,
        this.form.value.content,
        this.form.value.image
      );
      this.router.navigate(['/']);
    }
    this.form.reset();
  }
}
