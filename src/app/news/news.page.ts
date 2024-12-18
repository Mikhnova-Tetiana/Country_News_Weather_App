import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonList, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { MyDataService } from '../services/my-data.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
  standalone: true,
  imports: [IonBackButton, IonButtons, IonList, IonCardTitle, IonCardContent, IonCardHeader, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class NewsPage implements OnInit {
  news: any = [];
  countryName: string = "";
  placeholderImage = 'assets/images/placeholder.png'; 

  constructor(private mds: MyDataService) { }

  ngOnInit() {
    this.getStorageData();
  }

  async getStorageData(){
    let result = await this.mds.get("news");
    console.log(result);
    if (result.message == "The country you provided does not exist in our database.") {
      this.news = null;
    } else {
      this.news = result;
    }
    this.countryName = await this.mds.get("countryName");
  }

  onImageError(event: any) {
    event.target.src = this.placeholderImage;
  }

}
