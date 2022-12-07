import { Element } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { Objeto } from 'src/app/Models/objeto';

@Component({
  selector: 'app-jugador',
  templateUrl: './jugador.component.html',
  styleUrls: ['./jugador.component.css']
})
export class JugadorComponent implements OnInit {

  @Input() px: number = 10;
  @Input() py: number = 10;
  @Input() width: number = 40;
  @Input() height: number = 40;
  // @Input() lado: string = "der";
  @Input() objetos: Objeto[] = [];
  @Input() img: number = 1;

  // 0 derecha
  // 90 abajo
  // 180 izquierda
  // 270 arriba

  @Input() ladoDeg: number = 0;


  // pcm1: ImageBitmap = new ImageBitmap();

  constructor() { }

  ngOnInit(): void {



    this.inicializarJugador();
    // this.dibujarJugador();
  }

  inicializarJugador() {
    var jugador = document.getElementById('jugador') ?? document.createElement('a');
    jugador.style.width = this.width + "px";
    jugador.style.height = this.height + "px";
    jugador.style.borderRadius = (this.width / 2) + "px";
  }
}
