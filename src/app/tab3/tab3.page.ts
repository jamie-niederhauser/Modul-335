import { Component, OnInit, ViewChild } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../Pizza-bestellung/explore-container.component';
import { PhotoComponent } from '../photo/photo.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Order } from 'src/data/order';
import { environment } from 'src/environments/environment';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { decode } from 'base64-arraybuffer';
import { image } from 'ionicons/icons';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [ IonicModule, FormsModule, PhotoComponent, ],
})
export class Tab3Page implements OnInit {
  @ViewChild(PhotoComponent) cameraComponent: PhotoComponent | undefined;
  private client: SupabaseClient;

 
  constructor() {
    this.client = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  public photo?: Order = undefined;

  ngOnInit(): void {
    this.photo = {} as Order;
  }

  ionViewWillEnter() {
    this.takePicture();
  }

  takePicture(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.cameraComponent) {
        this.cameraComponent
          .takePicture()
          .then((content: string | undefined) => {
            if (this.photo && content) {
              this.photo.url = content;
              this.sendImageMessage();
            }
          })
          .catch((error: any) => {
            reject(error);
          });
      } else {
        reject('Camera component not found');
      }
    });
  }

 

  private uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        // eslint-disable-next-line one-var
        var r = (Math.random() * 16) | 0,
          // eslint-disable-next-line one-var
          v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

  async sendImageMessage() {
    let id = this.uuidv4();
    let file = `public/${id}.png`;
    console.log(decode(this.photo?.url || ''));
    let { data: fileData } = await this.client.storage
      .from('image')
      .upload(file, decode(this.photo?.url || ''), {
        contentType: 'image/png',
      });

      if (!fileData?.path) {
        return;
      }
      let { data: url } = this.client.storage
        .from('image')
        .getPublicUrl(fileData?.path);
      const { data, error } = await this.client
        .from('image')
        .insert([
          {
            url: url.publicUrl,
          },
        ])
        .select();
  
      return data;
    }


}
