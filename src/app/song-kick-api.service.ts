import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SongKickApiService {

  constructor(private httpClient: HttpClient) { }

  public getConcert(concert: string){
    // return this.httpClient.get(`https://pokeapi.co/api/v2/pokemon/` + concert);
    return this.httpClient.get(`assets/events.json`);
  }
  
}
