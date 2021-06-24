import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  @Input() events: string[];
  @Output() eventsChange = new EventEmitter<string[]>();

  city: string;

  cityControl: FormControl = new FormControl(
    '',
             Validators.compose([Validators.minLength(2), Validators.required])
  );

  // cityFormGroup = this.form.group({
  //   cityControl: ['', Validators.required] //, Validators.minLength(2)];
  // })

  constructor(private form: FormBuilder) { }

  ngOnInit(): void {
  }

  searchEvent(): void {
    if (!this.cityControl.invalid){
      this.city = this.cityControl.value;
      this.events = [this.city, this.city, this.city];
      this.eventsChange.emit(this.events);
    }

  }


}
