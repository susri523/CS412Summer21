import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  @Input() events: string[];
  @Output() eventsChange = new EventEmitter<string[]>();


  city: string='test';
  e: string[];

  constructor() { }

  ngOnInit(): void {
  }

  searchEvent(city: string): void {
    this.events = [city, city, city];
    this.eventsChange.emit(this.events);
  }


}
