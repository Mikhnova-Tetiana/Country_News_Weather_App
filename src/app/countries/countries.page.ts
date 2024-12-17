import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonButton } from '@ionic/angular/standalone';
import { MyDataService } from '../services/my-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.page.html',
  styleUrls: ['./countries.page.scss'],
  standalone: true,
  imports: [IonButton, IonCardTitle, IonCardHeader, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class CountriesPage implements OnInit {
  countriesData: any = [];

  constructor(
    private mds: MyDataService,
    private router: Router,
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
        name: country.name.official
      });
    }
  }
  
  openNews(){
    this.router.navigate(['/news']);
  }

}
