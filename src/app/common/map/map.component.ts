import { Component, Input, OnInit } from '@angular/core';
import { MarkerGeolocation } from './marker-geolocation.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  @Input() lat: number;
  @Input() long: number;
  @Input() markers: MarkerGeolocation[];
  constructor() { }

  ngOnInit(): void {
    console.log(this.lat + "");
    console.log(this.long + "")
    if (!this.markers) {
      this.markers = [];
    }
  }

}
