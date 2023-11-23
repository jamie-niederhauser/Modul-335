import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SupabaseService } from 'src/services/supabase.service';
import { Order } from 'src/data/order';
import { CommonModule } from '@angular/common';
import { LocalNotifications } from '@capacitor/local-notifications';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule]
})
export class ListComponent  implements OnInit {

  orders : Array<Order> | null = []
  

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

  delete (order: Order) {
    this.supabase.deleteOrder(order)
      .then(payload =>  {
        this.supabase.getOrders()
          .then(data => {
            this.orders = data
          })
      })
  }

  async scheduleNotifications() {

    LocalNotifications.schedule({
      notifications: [
        {
          title: 'Ihr Essen wurde ausgeliefert',
          body: 'Guten Appetit wünschen wir ihnen',
          id: 1,
          schedule: { at: new Date(Date.now() + 1000), allowWhileIdle: true },
        },
      ],
    });
  }

}
