import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IndexComponent} from './pages/index/index.component';
import {BookmarksRoutingModule} from "./bookmarks-routing.module";
import {NewBookmarkComponent} from './components/new-bookmark/new-bookmark.component';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatCardModule} from '@angular/material/card';
import {CreateFormComponent} from './components/create-form/create-form.component';
import {SharedModule} from "../shared/shared.module";
import {BookmarkComponent} from './components/bookmark/bookmark.component';
import {BookmarkEditComponent} from './components/bookmark-edit/bookmark-edit.component';
import {BookmarkDeleteComponent} from './components/bookmark-delete/bookmark-delete.component';
import {BookmarkContainerComponent} from './components/bookmark-container/bookmark-container.component';
import {BookmarksService} from "../../core/services/bookmarks/bookmarks.service";
import {HttpClient} from "@angular/common/http";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {key, reducer} from "./store/reducers";
import {BookmarksEffects} from "./store/effects";
import {MatStepperModule} from "@angular/material/stepper";
import {MatFormFieldModule} from "@angular/material/form-field";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {SidenavComponent} from './components/sidenav/sidenav.component';
import {DialogComponent} from './components/dialog/dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {BookmarkValidator} from "../../core/validators/bookmarks/bookmark.validator";
import {FormFactory} from "../../core/factories/bookmark.factory";
import {EditFormComponent} from './components/edit-form/edit-form.component';
import {ResizerService} from "../../core/services/resizer/resizer.service";
import {FormComponent} from './components/form/form.component';
import {SidenavService} from "../../core/services/sidenav/sidenav.service";
import {TranslateModule} from "@ngx-translate/core";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";

@NgModule({
  declarations: [
    IndexComponent,
    NewBookmarkComponent,
    CreateFormComponent,
    BookmarkComponent,
    BookmarkEditComponent,
    BookmarkDeleteComponent,
    BookmarkContainerComponent,
    SidenavComponent,
    DialogComponent,
    EditFormComponent,
    FormComponent
  ],
    imports: [
        CommonModule,
        BookmarksRoutingModule,
        MatIconModule,
        MatButtonModule,
        MatSidenavModule,
        MatCardModule,
        SharedModule,
        StoreModule.forFeature(key, reducer),
        EffectsModule.forFeature([BookmarksEffects]),
        MatStepperModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        MatDialogModule,
        TranslateModule,
        MatSlideToggleModule,
    ],
  providers: [
    BookmarksService,
    HttpClient,
    BookmarkValidator,
    FormFactory,
    {provide: 'bookmarksSidenavService', useClass: SidenavService},
    ResizerService
  ],
  exports: [
    BookmarkComponent
  ]
})
export class BookmarksModule {
}
