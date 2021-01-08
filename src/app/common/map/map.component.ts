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
    if (!this.markers) {
      this.markers = [];
    }
  }

}
