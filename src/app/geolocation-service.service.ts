import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';


@Injectable({
  providedIn: 'root'
})
export class GeolocationServiceService {

  constructor() { }

  printCurrentPosition = async () => {
    let attrs = {enableHighAccuracy: true}

    const coordinates = await Geolocation.getCurrentPosition(attrs);
  
    console.log('Current position:', coordinates);
    return coordinates;

  }

}
