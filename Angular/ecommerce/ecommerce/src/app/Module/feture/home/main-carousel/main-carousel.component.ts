import { Component } from '@angular/core';
import { homeCarouselData } from 'src/Data/mainCarousel';
@Component({
  selector: 'app-main-carousel',
  templateUrl: './main-carousel.component.html',
  styleUrls: ['./main-carousel.component.scss']
})
export class MainCarouselComponent  {

  carouselData=homeCarouselData;

  currentSlide= 0;
  interval: any;

  ngOnInit() {
    this.autoPlay();
  }

  autoPlay() {
    setInterval(() => {
      this.nextSlide();
    }, 2000); 
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.carouselData.length;
    console.log("current slide - ", this.currentSlide)
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.carouselData.length) % this.carouselData.length;
  }
}
