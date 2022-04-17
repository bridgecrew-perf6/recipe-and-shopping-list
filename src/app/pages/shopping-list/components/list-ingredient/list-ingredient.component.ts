import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-list-ingredient',
  templateUrl: './list-ingredient.component.html',
  styleUrls: ['./list-ingredient.component.scss'],
})
export class ListIngredientComponent implements OnInit {
  @Input() listIngredient!: any[];
  @Output() addMoreItem = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}
  handleMoreItem() {
    this.addMoreItem.emit(15);
  }
}
