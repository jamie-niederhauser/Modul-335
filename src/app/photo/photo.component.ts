import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { CameraService } from 'src/services/camera.service';
import { Photo } from 'src/data/photo';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class PhotoComponent  implements OnInit {
  photos: Photo[] = [];

  @Output() pictureTaken = new EventEmitter<string>();

  imgSrc!: string | undefined;
  lat: number | null = null;
  lon: number | null = null;
  preis: number | null = null;
  pizza : string|  undefined;
  resetClicked: boolean = false;

  constructor(private cameraService: CameraService) {}

  ngOnInit() {
    this.loadPhotos();
  }

  async initiatePhotoCapture() {
    await this.takePic();
  }

  async takePic() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        source: CameraSource.Camera,
        resultType: CameraResultType.Base64,
      });

      if (!this.resetClicked) {
        await this.savePhotoToDatabase(image.base64String || '');

        this.imgSrc = `data:image/png;base64,${image.base64String}`;
      }

      this.resetClicked = false;

      return image.base64String;
    } catch (error) {
      console.error('Error capturing picture', error);
      return undefined;
    }
  }

  resetPic() {
    this.resetClicked = true;
    this.imgSrc = '';
  }

  async savePhotoToDatabase(base64: string) {
    const id = Math.floor(Math.random() * 1000000);

    const orderData = {
      id: id,
      url: base64,
    };

    await this.cameraService.createPhoto(orderData);
  }
  loadPhotos() {
    this.cameraService.getPhotos().then((photos) => {
      this.photos = photos.map((photo) => {
        const base64 = `data:image/png;base64,${photo.url}`;
        console.log('Base64 URL:', base64); // Add this line for logging
        return {
          ...photo,
          url: base64,
        };
      });
    });
  }


 /* @Output() pictureTaken = new EventEmitter<string>();
  imageUrl : string | undefined

  async takePicture() {
    try {
      const image = await Camera.getPhoto({
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera,
        quality: 100,
      });
      return image.base64String;
      this.imageUrl = image.webPath;
    } catch (error) {
      console.error('Error capturing picture', error);
      return undefined;
    }
  }

  constructor() { }

 

  ngOnInit() {}


  resetPicture () {
    this.imageUrl = '' 
  }
*/

}
