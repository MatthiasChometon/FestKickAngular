import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-concert-view',
  templateUrl: './concert-view.component.html',
  styleUrls: ['./concert-view.component.scss']
})
export class ConcertViewComponent implements OnInit {

  @Input()
  concertInfos: any;

  constructor(private router: Router) { }

  ngOnInit(): void {}

  moreConcertInformations(concertName: string) {
    this.router.navigate(['description'], { queryParams: { concert: concertName } });
  }

}
