import { Component, OnInit, Input } from '@angular/core';
import { Objeto } from 'src/app/Models/objeto';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  @Input() objetos: Objeto[] = [];
  @Input() puntos:Objeto[] = [];
  
  constructor() { }

  ngOnInit(): void {
  }

}
