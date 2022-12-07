import { Component, OnInit, Input } from '@angular/core';
import { Objeto } from 'src/app/Models/objeto';

@Component({
  selector: 'app-fantasma',
  templateUrl: './fantasma.component.html',
  styleUrls: ['./fantasma.component.css']
})
export class FantasmaComponent implements OnInit {

  @Input() fantasma: Objeto = new Objeto();
  @Input() objetos: Objeto[] = [];
  @Input() img: number = 1;
  constructor() { }

  ngOnInit(): void {
  }

}
