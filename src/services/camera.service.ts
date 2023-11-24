import { Injectable } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { LoadingController } from '@ionic/angular';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Photo } from 'src/data/photo'; 
import { environment } from 'src/environments/environment';

export const Order_TABLE = 'Photo';

@Injectable({
  providedIn: 'root',
})
export class CameraService {
  private supabase: SupabaseClient;
  private orderData: Photo | null = null;

  constructor(private loadingCtrl: LoadingController) {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  createLoader() {
    return this.loadingCtrl.create();
  }

  async getPhotos() {
    const { data, error } = await this.supabase.from(Order_TABLE).select('*');
    console.log(data);
    return data || [];
  }

  resetPhotoData() {
    this.orderData = null;
  }

  async createPhoto(order: Photo) {
    const { data, error } = await this.supabase
      .from(Order_TABLE)
      .insert({
        url : order.url,
      })
      .select();
    LocalNotifications.schedule({
      notifications: [
        {
          largeIcon: 'camera',
          smallIcon: 'camera',
          title: 'New Photo',
          body: 'A new photo has been added',
          id: Math.floor(Math.random() * 1000000),
          schedule: { at: new Date(Date.now() + 1000 * 5) },
        },
      ],
    });
    return data;
  }

  async deletePhoto(order: Photo) {
    const { data, error } = await this.supabase
      .from(Order_TABLE)
      .delete()
      .eq('id', order.id)
      .select();

    return data;
  }
}