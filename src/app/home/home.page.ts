import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonInput, IonButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { settingsOutline } from 'ionicons/icons';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MyHttpService } from '../services/my-http.service';
import { HttpOptions } from '@capacitor/core';
import { MyDataService } from '../services/my-data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonButton, IonInput, IonIcon, IonHeader, IonToolbar, IonTitle, IonContent, FormsModule],
})
export class HomePage {
  countryName: string = "";
  options: HttpOptions = {
    url: "",
  }
  country: any = [];

  constructor(
    private router: Router,
    private mhs: MyHttpService,
    private mds: MyDataService
    ) {
    addIcons({ settingsOutline });
  }

  async searchCountry(){
    this.options.url = "https://restcountries.com/v3.1/name/".concat(this.countryName);
    console.log(this.options.url);
    this.country = await this.mhs.get(this.options);
    await this.mds.set("country", this.country);
    this.router.navigate(['/countries']);
  }
  openSettings(){
    this.router.navigate(['/settings']);
  }
}
