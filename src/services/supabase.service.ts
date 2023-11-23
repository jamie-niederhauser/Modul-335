import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js'
import { createClient } from '@supabase/supabase-js';
import { Order } from 'src/data/order';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SupabaseService {

  private supabase: SupabaseClient

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
   }

   async getOrders(){
    const {data, error} = await this.supabase
    .from('Orders')
    .select('*')

    return data
  }

  async createOrder(order : Order) {

    const {data, error} = await this.supabase
      .from('Orders')
      .insert({
        pizza: order.pizza,
        preis: order.preis,
        latitude: order.latitude,
        longitude: order.longitude
      })

      .select('*')
      .single();
    return data
}

async deleteOrder (order: Order) {
  const {data, error} = await this.supabase
    .from('Orders')
    .delete()
    .eq('id', order.id)
    .select()

  return data
}


}
