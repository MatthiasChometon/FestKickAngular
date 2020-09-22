import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SongKickApiService } from '../song-kick-api.service';

@Component({
  selector: 'app-concert-description',
  templateUrl: './concert-description.component.html',
  styleUrls: ['./concert-description.component.scss']
})
export class ConcertDescriptionComponent implements OnInit {

  concert: any;
  concertName: string = "";

  constructor(private route: ActivatedRoute, private songKickApi: SongKickApiService) {}

  ngOnInit() {
    this.route
    .queryParams
    .subscribe(params => {
      this.concertName = params.concert;
      this.searchConcert(params.concert);
    });
  }

  searchConcert(concertInfos) {
    this.songKickApi.getConcertDetails(concertInfos).subscribe((data)=>{
      this.concert = data;
    });
  }

}
