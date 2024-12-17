import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonButton } from '@ionic/angular/standalone';
import { MyDataService } from '../services/my-data.service';
import { Router } from '@angular/router';
import { HttpOptions } from '@capacitor/core';
import { MyHttpService } from '../services/my-http.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.page.html',
  styleUrls: ['./countries.page.scss'],
  standalone: true,
  imports: [IonButton, IonCardTitle, IonCardHeader, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class CountriesPage implements OnInit {
  countriesData: any = [];
  apiKey: string = "pub_625934da6ac0ad04910dfcab8ad3c1448af40";
  options: HttpOptions = {
    url: ""
  }

  constructor(
    private mds: MyDataService,
    private router: Router,
    private mhs: MyHttpService,
  ) { }

  ngOnInit() {
    this.getCountries();
  }

  async getCountries(){
    let countries = await this.mds.get("countries");
    for (const country of countries){
      this.countriesData.push({
        flag: country.flags.png,
        alt: country.flags.alt,
        name: country.name.official,
        code: country.cca2, 
      });
    }
  }
  
  async openNews(code: string){
    this.router.navigate(['/news']);
    this.options.url = `https://newsdata.io/api/1/latest?apikey=${this.apiKey}&country=${code}`;
    let result = await this.mhs.get(this.options);
    await this.mds.set("news", result.data.results);
  }

}
