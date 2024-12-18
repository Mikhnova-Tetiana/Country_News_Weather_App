import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardTitle, IonButton, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { MyDataService } from '../services/my-data.service';
import { Router } from '@angular/router';
import { HttpOptions } from '@capacitor/core';
import { MyHttpService } from '../services/my-http.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.page.html',
  styleUrls: ['./countries.page.scss'],
  standalone: true,
  imports: [IonBackButton, IonButtons, IonButton, IonCardTitle, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class CountriesPage implements OnInit {
  countriesData: any = [];
  countryWeather: any = {};
  countryHolidays: any = [];

  newsdataApiKey: string = "pub_625934da6ac0ad04910dfcab8ad3c1448af40";
  openweatherApiKey: string = "b23c9ea4191abd5fb8e5bcff8c91bebc";
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
        capital: country.capital,
        latitude: country.latlng[0],
        longitude: country.latlng[1],
      });
    }
  }
  
  async openNews(code: string, name: string){
    this.options.url = `https://newsdata.io/api/1/latest?apikey=${this.newsdataApiKey}&country=${code}`;
    let result = await this.mhs.get(this.options);
    await this.mds.set("news", result.data.results);
    await this.mds.set("countryName", name);
    this.router.navigate(['/news']);
  }

  async openWeather(capital: string, latitude: number, longitude: number){
    let units: string = "metric";
    let savedUnits = await this.mds.get("unit");
    if(savedUnits) {
      units = savedUnits;
    }

    this.options.url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${this.openweatherApiKey}`
    let result = await this.mhs.get(this.options);
    let resultData = result.data;
    this.countryWeather = {
      capital: capital.toString(),
      description: resultData.weather[0].description,
      icon: resultData.weather[0].icon,
      temperature: resultData.main.temp,
      units: units,
    }

    await this.mds.set("countryWeather", this.countryWeather);
    this.router.navigate(['/weather']);
  }

  async openHolidays(code: string, name: string) {
    await this.mds.set("countryName", name);
    this.options.url = `https://date.nager.at/api/v3/publicholidays/2025/${code}`;
    let result = await this.mhs.get(this.options);
    this.countryHolidays = result.data;
    await this.mds.set("countryHolidays", this.countryHolidays);
    this.router.navigate(['/holidays']);
  }
}
