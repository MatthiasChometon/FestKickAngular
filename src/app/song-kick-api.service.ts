import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SongKickApiService {

  constructor(private httpClient: HttpClient) { }

  // public getConcerts(){
  //   return this.httpClient.get(`https://pokeapi.co/api/v2/pokemon/?limit=20`);
  // }

  public getConcert(concert: string){
    return this.httpClient.get(`https://pokeapi.co/api/v2/pokemon/` + concert);
  }
  
}
