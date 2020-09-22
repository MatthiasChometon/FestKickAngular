import { AfterViewInit, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SongKickApiService } from '../song-kick-api.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-concert-list',
  templateUrl: './concert-list.component.html',
  styleUrls: ['./concert-list.component.scss']
})
export class ConcertListComponent implements AfterViewInit  {

  concert: any;
  concerts: any;
  mapActivated: boolean = false;
  coordinates: number[] = [];
  error: boolean = false;

  constructor(private songKickApi: SongKickApiService, private route: ActivatedRoute, private router: Router) {
    this.route
    .queryParams
    .subscribe(params => {
      this.getCityConcert(params.city);
    });
   }

  ngAfterViewInit(): void {

  }

  getCityConcert(city) {
    if(city) {
      this.songKickApi.getCity(city).subscribe((data)=>{
        if(data['resultsPage']['totalEntries'] != 0) {
          this.songKickApi.getConcerts(data['resultsPage']['results']['location'][0]['metroArea']['id']).subscribe((data)=>{
            this.concerts = data;
          });
          this.error = false;
        } else {
          this.error = true;
        }
      });
    }
  }

  displayMap() {
    this.mapActivated = !this.mapActivated;
    if(this.mapActivated == true) {
      this.localisation();
      this.songKickApi.getConcertsByLatAndLng(sessionStorage.getItem('latUser'), sessionStorage.getItem('lngUser')).subscribe((data)=>{
        this.songKickApi.getConcerts(data['resultsPage']['results']['location'][0]['metroArea']['id']).subscribe((data)=>{
          this.createMap(data);
        });
      });
    }
  }

  localisation(): void {
    navigator.geolocation.getCurrentPosition(function(position) {
      sessionStorage.setItem('latUser', position.coords.latitude.toString());
      sessionStorage.setItem('lngUser', position.coords.longitude.toString());
    })
  }
  
  createMap(concerts) {
        var mymap = L.map('map').setView([Number(sessionStorage.getItem('latUser')), Number(sessionStorage.getItem('lngUser'))], 12);
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
          maxZoom: 50,
          attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
            '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          id: 'mapbox/streets-v11',
          tileSize: 512,
          zoomOffset: -1
        }).addTo(mymap);

        for (let concert of concerts.resultsPage.results.event) {
          L.marker([concert.location.lat, concert.location.lng]).addTo(mymap)
          .bindPopup('<b>Le concert :</b><br />' + concert.displayName + '</b><br />');
        }
  } 
  
  showDescription(concertName) {
    this.router.navigate(['description'], { queryParams: { concert: concertName } });
  }

}
