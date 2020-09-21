import { AfterViewInit, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private songKickApi: SongKickApiService, private route: ActivatedRoute) { }
  ngAfterViewInit(): void {
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

  displayMap() {
    this.mapActivated = !this.mapActivated;
    if(this.mapActivated == true) {
      this.createMap();
    }
  }
  
  createMap() {
    // if(this.mapActivated == true) {
      var concerts = this.concerts;
      navigator.geolocation.getCurrentPosition(function(position) {
        var mymap = L.map('map').setView([position.coords.latitude, position.coords.longitude], 12);

        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
          maxZoom: 50,
          attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
            '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          id: 'mapbox/streets-v11',
          tileSize: 512,
          zoomOffset: -1
        }).addTo(mymap);

        for (let concert of concerts.results) {
          L.marker([position.coords.latitude + getRandomInt(10) * 0.01, position.coords.longitude  + getRandomInt(10) * 0.01]).addTo(mymap)
          .bindPopup("<b>Le concert :</b><br />" + concert.name).on('click', function(e) {
            showDescription(concert.name);
        });
          //var popup = L.popup();
        }

        function getRandomInt(max) {
          return Math.floor(Math.random() * Math.floor(max));
        }

        // if(this.concerts) {
           //console.log(this.concerts);
        // }
        // console.log(typeof this.mapActivated);
        // if(this.concerts == null) {
        //   this.concerts = "";
        // }

        // console.log(this.concerts);

        
      
        // function onMapClick(e) {
        //   popup
        //     .setLatLng(e.latlng)
        //     .setContent("You clicked the map at " + e.latlng.toString())
        //     .openOn(mymap);
        // }
      
        // mymap.on('click', onMapClick);
      });

      function showDescription(concertName) {
        this.router.navigate(['description'], { queryParams: { concert: concertName } });
      }

    // }
  } 


}
