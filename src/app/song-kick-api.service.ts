import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SongKickApiService {

  API_KEY: string = "926QLoynaFfTnoup";

  constructor(private httpClient: HttpClient) { }

  public getCity(city: string){
    return this.httpClient.get("https://api.songkick.com/api/3.0/search/locations.json?query=" + city + "&apikey=" + this.API_KEY);
    // return this.httpClient.get(`assets/events.json`);
  }

  public getConcerts(metroArea: string){
    return this.httpClient.get("https://api.songkick.com/api/3.0/metro_areas/" + metroArea + "/calendar.json?apikey=" + this.API_KEY);
    // return this.httpClient.get(`assets/events.json`);
  }

  public getConcertDetails(concertId: number){
    return this.httpClient.get("https://api.songkick.com/api/3.0/events/" + concertId + ".json?apikey=" + this.API_KEY);
    // return this.httpClient.get(`assets/events.json`);
  }
  
}
