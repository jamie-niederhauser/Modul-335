import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GeolocationServiceService } from 'src/services/geolocation-service.service'; 
import { SupabaseService } from 'src/services/supabase.service';
import { Order } from 'src/data/order';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule]
})
export class ExploreContainerComponent implements OnInit {
  @Input() name?: string;


   order : Order = new Order()

   orders : Array<any> | undefined = []

   constructor (
    public geolocationService : GeolocationServiceService,
    private supabase : SupabaseService
   ) {}

   getCurrentPosition = async () => {
    const position = await this.geolocationService.printCurrentPosition()
    this.order.latitude = position.coords.latitude
    this.order.longitude = position.coords.longitude
  }
  

  berechnePreis( ) { 
    // Überprüfe den ausgewählten Pizzatyp und weise den entsprechenden Preis zu
    switch (this.order.pizza) {
      case 'Margherita':
        this.order.preis = 20;
        console.log('tes')
        return this.order.preis;
        break;
      case 'Salami':
        this.order.preis = 25; // Annahme: Preis für Salami
        return this.order.preis;
        break;
      case 'Prosciutto':
        this.order.preis = 22; // Annahme: Preis für Prosciutto
        return this.order.preis;
        break;
      case 'Funghi':
        this.order.preis = 18; // Annahme: Preis für Funghi
        return this.order.preis;
        break;
      default:
        console.log('Ungültiger Pizzatyp ausgewählt');
        return this.order.preis; // Verlasse die Methode, wenn der Pizzatyp ungültig ist
    }

  }


  ngOnInit() {
    this.loadData()
      }


  loadData = async ( ) => {
    let orders = await this.supabase.getOrders()
    this.orders = orders!

    console.log(this.orders)
  }

  createData = async () => {
    let order = await this.supabase.createOrder(this.order)
    this.order = order!

    console.log(this.order)
  }
}

