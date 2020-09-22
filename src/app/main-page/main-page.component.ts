import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SongKickApiService } from '../song-kick-api.service';
import {MatToolbarModule} from '@angular/material/toolbar';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  concertCity: string = "";
  concert: any = {}

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.searchConcert();
  }

  searchConcert() {
    this.router.navigate(['list'], { queryParams: { city: this.concertCity } });
  }

}
