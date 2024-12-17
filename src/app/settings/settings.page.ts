import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonRadioGroup, IonRadio } from '@ionic/angular/standalone';
import { MyDataService } from '../services/my-data.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonRadio, IonRadioGroup, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class SettingsPage implements OnInit {
  unit: string = 'metric';

  constructor(private mds: MyDataService) { }

  ngOnInit() {
    this.setNewUnit();
  }

  async saveUnit(){
    await this.mds.set("unit", this.unit);
  }

  async setNewUnit(){
    let savedUnit = await this.mds.get("unit");
    if(savedUnit) {
      this.unit = savedUnit;
    }
  }

}
