import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { MyDataService } from './services/my-data.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  darkModeEnabled: boolean = false;
  constructor(private mds: MyDataService) {
  }

  ngOnInit() {
    this.initializeTheme();
  }

  // Initialize the theme preference by checking the saved theme in storage.
  // If a theme is saved, set the dark mode state accordingly.
  async initializeTheme() {
    const savedTheme = await this.mds.get('theme');
    this.darkModeEnabled = savedTheme === 'dark';
    this.setTheme(this.darkModeEnabled);
  }

  // Apply the selected theme (light or dark) to the application and save the preference to storage.
  async setTheme(darkMode: boolean) {
    document.body.classList.toggle('dark', darkMode);
    await this.mds.set('theme', darkMode ? 'dark' : 'light');
  }

}
