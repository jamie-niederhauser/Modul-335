import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GeolocationServiceService } from '../geolocation-service.service';
import { SupabaseService } from '../supabase.service';
import { Order } from 'src/data/order';

@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule]
})
export class ExploreContainerComponent implements OnInit {
  @Input() name?: string;
  pizza = "";
   preis = 0;

   latitude: number = 0
   longitude : number = 0

   order : Order = new Order()

   orders : Array<any> | undefined = []

   constructor (
    public geolocationService : GeolocationServiceService,
    private supabase : SupabaseService
   ) {}

   getCurrentPosition = async () => {
    const position = await this.geolocationService.printCurrentPosition()
    this.latitude = position.coords.latitude
    this.longitude = position.coords.longitude
  }
  

  berechnePreis( ) { 
    // Überprüfe den ausgewählten Pizzatyp und weise den entsprechenden Preis zu
    switch (this.pizza) {
      case 'Margherita':
        this.preis = 20;
        console.log('tes')
        return this.preis;
        break;
      case 'Salami':
        this.preis = 25; // Annahme: Preis für Salami
        return this.preis;
        break;
      case 'Prosciutto':
        this.preis = 22; // Annahme: Preis für Prosciutto
        return this.preis;
        break;
      case 'Funghi':
        this.preis = 18; // Annahme: Preis für Funghi
        return this.preis;
        break;
      default:
        console.log('Ungültiger Pizzatyp ausgewählt');
        return this.preis; // Verlasse die Methode, wenn der Pizzatyp ungültig ist
    }

  }


  ngOnInit() {
    this.loadData()
    this.createData()
      }


  loadData = async ( ) => {
    let orders = await this.supabase.getOrders()
    this.orders = orders!

    console.log(this.orders)
  }

  createData = async ( ) => {
    let order = await this.supabase.createFood(this.order)
    this.order = order!

    console.log(this.order)
  }
}

