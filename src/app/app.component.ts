import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Post } from './_services/model.post';
import { PostService } from './_services/post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  form: FormGroup;
  constructor(
    private postService: PostService,
    private formBuilder: FormBuilder,
  ) {
    this.setup();
  }
  posts: Post[] = [];
  setup() {
    this.postService.getAll()
      .pipe(first())
      .subscribe(posts => {
        this.posts = posts;
      });

    console.log(this.posts);
  }
  post = <Post>{};
  load(post: Post) {
    this.post = <Post>{};
    this.post = post;
  }
  deletePost(id: number) {
    if (confirm("Are you sure want to delete post?")) {
      this.postService.delete(id).pipe(first())
        .subscribe(() => {
          alert('deleted');
          this.setup();
        });
    } else {
      document.getElementById('popup')?.click();
    }
  }
  loading = false;
  submitted = false;
  get f() { return this.form.controls; }
  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.postService.create(this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    alert("post created");
                    this.loading = false;
                    document.getElementById('add')?.click();
                },
                error: error => {
                    console.log(error)
                    this.loading = false;
                }
            });
  }
  ngOnInit() {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      body: ['', Validators.required]
    });
  }
}
