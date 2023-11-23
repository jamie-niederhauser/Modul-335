import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class PhotoComponent  implements OnInit {

  @Output() pictureTaken = new EventEmitter<string>();
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


}
