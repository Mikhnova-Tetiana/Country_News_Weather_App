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

  async initializeTheme() {
    const savedTheme = await this.mds.get('theme');
    this.darkModeEnabled = savedTheme === 'dark';
    this.setTheme(this.darkModeEnabled);
  }

  async setTheme(darkMode: boolean) {
    document.body.classList.toggle('dark', darkMode);
    await this.mds.set('theme', darkMode ? 'dark' : 'light');
  }

}
