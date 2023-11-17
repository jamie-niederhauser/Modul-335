import { Component, OnInit } from '@angular/core';
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

  constructor() { }

  imageUrl : string | undefined

  ngOnInit() {}

  takePicture = async () => {

    // const permissionStatus = await Camera.requestPermissions()

    // console.log(permissionStatus)

    const image = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });

    this.imageUrl = image.webPath;

  };

  resetPicture () {
    this.imageUrl = ''
  }


}
