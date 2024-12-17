import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCardTitle, IonCardContent, IonCardHeader, IonCardSubtitle, IonCard } from '@ionic/angular/standalone';
import { MyDataService } from '../services/my-data.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.page.html',
  styleUrls: ['./weather.page.scss'],
  standalone: true,
  imports: [IonCard, IonCardSubtitle, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class WeatherPage implements OnInit {
  weatherData: any = {};
  icon: string = "";

  constructor(private mds: MyDataService) { }

  ngOnInit() {
    this.getWeatherData();
  }

  async getWeatherData(){
    this.weatherData = await this.mds.get("countryWeather");
  }
  getIconUrl() {
    let iconUrl = `https://openweathermap.org/img/wn/${this.weatherData.icon}@2x.png`;
  }


}
