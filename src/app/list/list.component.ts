import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SupabaseService } from '../supabase.service';
import { Order } from 'src/data/order';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule]
})
export class ListComponent  implements OnInit {

  orders : Array<any> | undefined = []

  constructor(
    private supabase : SupabaseService
  ) { }

  ngOnInit() {
    this.loadData()
  }

  loadData = async ( ) => {
    let orders = await this.supabase.getOrders()
    this.orders = orders!

    console.log(this.orders)
  }

}
