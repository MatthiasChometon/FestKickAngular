import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConcertDescriptionComponent } from './concert-description/concert-description.component';
import { ConcertListComponent } from './concert-list/concert-list.component';
import { MainPageComponent } from './main-page/main-page.component';

const routes: Routes = [
  { path: 'list', component: ConcertListComponent },
  { path: 'description', component: ConcertDescriptionComponent},
  { path: '**', component: ConcertListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
