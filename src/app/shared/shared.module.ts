import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommentsComponent} from './components/comments/comments.component';
import {MaterialModule} from "./material.module";
import {ReactiveFormsModule} from "@angular/forms";
import {ShortenPipe} from "./pipes/shorten.pipe";
import {TitlenamePipe} from "./pipes/titlename.pipe";
import {TimeagoPipe} from "./pipes/timeago.pipe";


@NgModule({
  declarations: [
    CommentsComponent,
    ShortenPipe,
    TitlenamePipe,
    TimeagoPipe
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    CommentsComponent,
    MaterialModule,
    ReactiveFormsModule,
    ShortenPipe,
    TitlenamePipe,
    TimeagoPipe
  ]
})
export class SharedModule {
}
