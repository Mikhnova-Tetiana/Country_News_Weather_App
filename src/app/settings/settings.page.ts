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

  // Save the current unit preference to the storage.
  async saveUnit(){
    await this.mds.set("unit", this.unit);
  }

  // Retrieve the saved unit preference from storage and update the local property.
  async setNewUnit(){
    let savedUnit = await this.mds.get("unit");
    if(savedUnit) {
      this.unit = savedUnit;
    }
  }


  // Initialize the theme preference by checking the saved theme in storage.
  // If a theme is saved, set the dark mode state accordingly.
  async initializeTheme() {
    const savedTheme = await this.mds.get('theme');
    this.darkModeEnabled = savedTheme === 'dark';
    this.setTheme(this.darkModeEnabled);
  }

  // Toggle the theme between light and dark mode based on user interaction.
  async toggleTheme(event: any) {
    this.darkModeEnabled = event.detail.checked;
    await this.setTheme(this.darkModeEnabled);
  }

  // Apply the selected theme (light or dark) to the application and save the preference to storage.
  async setTheme(darkMode: boolean) {
    document.body.classList.toggle('dark', darkMode);
    await this.mds.set('theme', darkMode ? 'dark' : 'light');
  }

}