import { Component, Input, OnInit } from '@angular/core';
import { Data } from '../../interfaces/data.interface';

@Component({
  selector: 'data-card',
  templateUrl: './card.component.html',
  styles: [],
})
export class CardComponent implements OnInit {
  @Input()
  public data!: Data;

  @Input()
  public esAdmin!: boolean;

  ngOnInit(): void {
    if (!this.data) throw Error('Data property es requerida');
  }
}
