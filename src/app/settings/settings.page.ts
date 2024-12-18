import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonRadioGroup, IonRadio, IonBackButton, IonButtons, IonToggle } from '@ionic/angular/standalone';
import { MyDataService } from '../services/my-data.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonToggle, IonButtons, IonBackButton, IonRadio, IonRadioGroup, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class SettingsPage implements OnInit {
  unit: string = 'metric';
  darkModeEnabled: boolean = false;

  constructor(
    private mds: MyDataService,
  ) { }

  ngOnInit() {
    this.setNewUnit();
    this.initializeTheme();
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

  async initializeTheme() {
    const savedTheme = await this.mds.get('theme');
    this.darkModeEnabled = savedTheme === 'dark';
    this.setTheme(this.darkModeEnabled);
  }

  // Toggle the dark theme and save preference
  async toggleTheme(event: any) {
    this.darkModeEnabled = event.detail.checked;
    await this.setTheme(this.darkModeEnabled);
  }

  // Set the theme and persist it to Ionic Storage
  async setTheme(darkMode: boolean) {
    document.body.classList.toggle('dark', darkMode);
    await this.mds.set('theme', darkMode ? 'dark' : 'light');
  }

}