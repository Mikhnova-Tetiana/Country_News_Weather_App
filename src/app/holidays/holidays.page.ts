import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonList, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonCard } from '@ionic/angular/standalone';
import { MyDataService } from '../services/my-data.service';

@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.page.html',
  styleUrls: ['./holidays.page.scss'],
  standalone: true,
  imports: [IonCard, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonList, IonLabel, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class HolidaysPage implements OnInit {
  holidays: any = [];
  countryName: string = "";
  constructor(private mds: MyDataService) { }

  ngOnInit() {
    this.getStorageData();
  }

  async getStorageData(){
    this.holidays = await this.mds.get("countryHolidays");
    this.countryName = await this.mds.get("countryName");
  }
}
