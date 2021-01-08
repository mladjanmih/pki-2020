import { Component, Input, OnInit } from '@angular/core';
import { Lightbox } from 'ngx-lightbox';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  @Input() images: string[];

  albums = [];
  constructor(private _lightbox: Lightbox) {

  }

  ngOnInit() {
    for (let i = 0; i < this.images.length; i++) {
      const src = this.images[i];
      const caption = 'Image ' + i;
      const thumb = this.images[i];
      const album = {
         src: src,
         caption: caption,
         thumb: thumb
      };

      this.albums.push(album);
    }
  }

  open(index: number): void {
    // open lightbox
    this._lightbox.open(this.albums, index);
  }

  close(): void {
    // close lightbox programmatically
    this._lightbox.close();
  }
}
