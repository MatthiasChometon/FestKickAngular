import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SongKickApiService } from '../song-kick-api.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  concertName: string = "";
  concert: any = {}

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.searchConcert();
  }

  searchConcert() {
    if(!this.concertName) {
      this.concertName = "";
    }
    this.router.navigate(['list'], { queryParams: { concert: this.concertName } });
  }

}
