import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../Pizza-bestellung/explore-container.component';
import { PhotoComponent } from '../photo/photo.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [ IonicModule, FormsModule, PhotoComponent],
})
export class Tab3Page {
  constructor() {}
}
