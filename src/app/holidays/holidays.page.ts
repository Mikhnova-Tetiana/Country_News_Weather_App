import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonList, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonCard, IonImg, IonBackButton, IonButtons } from '@ionic/angular/standalone';
import { MyDataService } from '../services/my-data.service';
import { MyHttpService } from '../services/my-http.service';
import { HttpOptions } from '@capacitor/core';

@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.page.html',
  styleUrls: ['./holidays.page.scss'],
  standalone: true,
  imports: [IonButtons, IonBackButton, IonCard, IonCardSubtitle, IonCardTitle, IonCardHeader, IonList, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class HolidaysPage implements OnInit {
  unsplashKey: string = "67GCWxTTqBerSIWt4ZXxyaIf9zP45qP4bpdrIQRp-8E";
  holidays: any = [];
  countryName: string = "";
  options: HttpOptions = {
    url: ""
  }
  
  constructor(
    private mds: MyDataService,
    private mhs: MyHttpService,
  ) { }

  ngOnInit() {
    this.getData();
  }

  async getData(){
    this.holidays = await this.mds.get("countryHolidays");
    this.countryName = await this.mds.get("countryName");
    
    for (let holiday of this.holidays){
      this.options.url = `https://api.unsplash.com/search/photos?query=${holiday.name}&client_id=${this.unsplashKey}`;
      let result = await this.mhs.get(this.options);
      let random = Math.floor(Math.random() * 10);
      if (result?.data.results && result.data.results.length > 0) {
        holiday.image = result.data.results[random].urls.small;
      } else {
        holiday.image = "assets/default-image.png";
      }
      this.options.url = `https://en.wikipedia.org/w/api.php?action=opensearch&search=${holiday.name}&limit=1&format=json&origin=*`;
      result = await this.mhs.get(this.options);
      console.log(result.data);
    }
  }

}
