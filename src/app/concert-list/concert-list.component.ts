import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SongKickApiService } from '../song-kick-api.service';

@Component({
  selector: 'app-concert-list',
  templateUrl: './concert-list.component.html',
  styleUrls: ['./concert-list.component.scss']
})
export class ConcertListComponent implements OnInit {

  concert: any;
  concerts: any;

  constructor(private songKickApi: SongKickApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route
    .queryParams
    .subscribe(params => {
      this.getConcert(params.concert);
    });
  }

  getConcert(concertName) {
    if(!concertName) {
      concertName = "";
    }
    this.songKickApi.getConcert(concertName).subscribe((data)=>{
      this.concerts = data;
    });
  }

}
