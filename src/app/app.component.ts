import { Component, OnInit } from '@angular/core';
import { max } from 'rxjs';
import { Objeto } from './Models/objeto';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'juego';


  // id's Intervals y TimeOuts
  idIntervalFantasmaMover: number[] = [];
  idIntervalFantasmaDibujar: number[] = [];

  // Juego
  play: boolean = false;
  dificultad: string = "Normal";

  // Fantasmas
  cantFantasmas: number = 3;
  fantasmas: Objeto[] = [];
  velocidadFan: number = 2;
  imgFants: number[] = [];
  ladoFants: string[] = [];
  busquedaDeJugador: number = 40;
  maxS: number[] = [];
  minS: number[] = [];

  // Pantalla y tablero
  marginTop: number = 0;
  marginLeft: number = 0;
  anchoTablero: number = 600;
  largoTablero: number = 500;
  anchoPantalla: number = 0;
  largoPantalla: number = 0;

  // Jugador pacman
  nivel: number = 1;
  jugador: Objeto = new Objeto();
  img: number = 1;
  mover: string = "";
  ladoDeg: number = 0;
  velocidadJugadoor: number = 3;
  maxVidas: number = 5;
  cantVidas: number = 3;
  vidas: number[] = [];
  quieto: boolean = true;
  muerto: boolean = false;
  choqueFantasma: boolean = false;
  delayChoqueFantasma: number = 2500;
  izqJugador: Objeto = new Objeto();
  derJugador: Objeto = new Objeto();
  arrJugador: Objeto = new Objeto();
  abaJugador: Objeto = new Objeto();

  // Mapa y puntos
  objetos: Objeto[] = [];
  puntos: Objeto[] = [];
  canrtPuntosAnt: number = 1;
  canrtPuntos: number = this.canrtPuntosAnt;

  // Teclas y keyCode
  // a = 97
  // w = 119
  // d = 100
  // s = 115
  constructor() { }

  ngOnInit(): void {
    window.onkeypress = (e) => {
      this.getKey(e.keyCode);
    };

    this.anchoPantalla = document.documentElement.clientWidth;
    this.largoPantalla = document.documentElement.clientHeight;
    this.marginLeft = (this.anchoPantalla - this.anchoTablero) * .5;
    this.marginTop = (this.largoPantalla - this.largoTablero) * .5;

    this.InicializarJuego();
    this.moverJugador(20, 15);
    this.moverFantasmas(20, 25);
  }


  // Inicializadores
  InicializarJuego() {
    this.inicializarFantasmas();
    this.inicializarJugador();
    this.inicializarMapa();
    this.inicializarPuntos()
  }

  inicializarFantasmas() {
    for (let i = 0; i < this.cantFantasmas; i++) {
      this.idIntervalFantasmaMover[i] = 0;
      this.idIntervalFantasmaDibujar[i] = 0;
      this.fantasmas[i] =
      {
        id: 5,
        px: 0,
        py: 0,
        tx: 30,
        ty: 30
      };

      this.imgFants[i] = 1;
      this.ladoFants[i] = "der";
      this.maxS[i] = 2;
      this.minS[i] = 1;
      this.fantasmas[i].px = ((this.anchoTablero / 2)) + (this.marginLeft);
      this.fantasmas[i].py = (this.largoTablero / 2) + (this.marginTop);
    }
  }

  inicializarJugador() {
    this.jugador = {
      id: 20,
      px: 0,
      py: 0,
      tx: 30,
      ty: 30
    }
    this.nivel = 1;
    this.quieto = true;
    this.muerto = false;
    this.choqueFantasma = false;
    this.img = 2;
    this.ladoDeg = 0;
    this.jugador.px = this.marginLeft + 10;
    this.jugador.py = this.marginTop + 10;
    this.vidas = [];
    for (let j = 0; j < this.cantVidas; j++) {
      this.vidas[j] = 1;
    }
  }

  inicializarMapa() {
    this.objetos[0] = {
      id: 1,
      px: 0 + this.marginLeft,
      py: 0 + this.marginTop,
      tx: this.anchoTablero,
      ty: this.largoTablero
    };

    this.objetos[1] = {
      id: 10,
      px: 0 + this.marginLeft,
      py: 505 + this.marginTop,
      tx: 620,
      ty: 1
    };

    this.objetos[2] = {
      id: 10,
      px: 605 + this.marginLeft,
      py: 0 + this.marginTop,
      tx: 1,
      ty: 500
    };

    this.objetos[3] = {
      id: 10,
      px: -1 + this.marginLeft,
      py: 0 + this.marginTop,
      tx: 1,
      ty: 500
    };

    this.objetos[4] = {
      id: 10,
      px: 0 + this.marginLeft,
      py: -1 + this.marginTop,
      tx: 600,
      ty: 1
    };

    this.objetos[5] = {
      id: 20,
      px: 0 + this.marginLeft,
      py: (this.largoTablero - 40) + this.marginTop,
      tx: 600,
      ty: 1
    };

    this.objetos[6] = {
      id: 20,
      px: 40 + this.marginLeft,
      py: (this.largoTablero - 160) + this.marginTop,
      tx: 120,
      ty: 80
    };

    this.objetos[7] = {
      id: 20,
      px: (this.anchoTablero - 160) + this.marginLeft,
      py: (this.largoTablero - 160) + this.marginTop,
      tx: 120,
      ty: 80
    };

    this.objetos[8] = {
      id: 20,
      px: (160) + this.marginLeft,
      py: 0 + this.marginTop,
      tx: 280,
      ty: 80
    };
  }

  inicializarPuntos() {
    for (let k = 0; k < this.canrtPuntos; k++) {
      this.ponerPunto();
    }
  }


  // Mover y dibujar
  moverJugador(delayMover: number, delayDibujar: number) {
    this.dibujarJugador(delayDibujar);
    // this.colisionPuntos();
    var idInterva = setInterval(() => {
      if (this.play) {
        this.lados();
        switch (this.mover) {
          case "izq":
            if (this.jugador.px > 0 && this.colision(this.izqJugador, true)) {
              this.jugador.px -= this.velocidadJugadoor;
            }
            break;

          case "arr":
            if (this.jugador.py > 0 && this.colision(this.arrJugador, true)) {
              this.jugador.py -= this.velocidadJugadoor;
            }
            break;

          case "der":
            if (this.jugador.px < this.anchoPantalla - (this.jugador.tx + 10) && this.colision(this.derJugador, true)) {
              this.jugador.px += this.velocidadJugadoor;
            }
            break;

          case "aba":
            if (this.jugador.py < this.largoPantalla - (this.jugador.ty + 10) && this.colision(this.abaJugador, true)) {
              this.jugador.py += this.velocidadJugadoor;
            }
            break;
        }
        this.colisionPuntos();
      }
    }, delayMover);
  }

  dibujarJugador(delayDibujar: number) {
    var cont = 0;
    var idInterval = setInterval(() => {
      if (this.quieto || this.muerto) {
        this.img = 2;
      } else {
        if (cont == 5) {
          if (this.img == 3) {
            this.img = 1;
          } else {
            this.img++;
          }
          cont = 0;
        } else {
          if (this.play) {
            cont++;
          }
        }
      }


    }, delayDibujar)
  }

  moverFantasmas(delayMover: number, delayDibujar: number) {
    this.dibujarFantasmas(delayDibujar);
    var lados: string[] = ['der', 'izq', 'arr', 'aba'];
    var colision: boolean = false;
    // var cont = 0;


    for (let cont = 0; cont < this.fantasmas.length; cont++) {
      var idInterval = setInterval(() => {
        if (this.play) {
          colision = this.colision(this.fantasmas[cont], false);

          // Mover el fantasma hacia el jugador
          if (this.getRandom(this.busquedaDeJugador) == 10 && colision) {

            var dMayX = this.jugador.px - this.fantasmas[cont].px;
            var dMenX = this.fantasmas[cont].px - this.jugador.px;
            var dMayY = this.jugador.py - this.fantasmas[cont].py;
            var dMenY = this.fantasmas[cont].py - this.jugador.py;

            if ((dMayX > dMenX && dMayX > dMayY && dMayX > dMenY)) {
              this.ladoFants[cont] = lados[0];
            }
            if ((dMenX > dMayX && dMenX > dMayY && dMenX > dMenY)) {
              this.ladoFants[cont] = lados[1];
            }
            if ((dMayY > dMenX && dMayY > dMayX && dMayY > dMenY)) {
              this.ladoFants[cont] = lados[3];
            }
            if ((dMenY > dMayY && dMenY > dMayX && dMenY > dMenX)) {
              this.ladoFants[cont] = lados[2];
            }
            switch (this.ladoFants[cont]) {
              case "der":
                this.maxS[cont] = 2;
                this.minS[cont] = 1;
                break;
              case "izq":
                this.maxS[cont] = 8;
                this.minS[cont] = 7;
                break;
              case "arr":
                this.maxS[cont] = 6;
                this.minS[cont] = 5;
                break;
              case "aba":
                this.maxS[cont] = 4;
                this.minS[cont] = 3;
                break;
            }
            this.imgFants[cont] = this.minS[cont];
          } else

            // Mover al fantasma hacia un lado Random
            if (this.getRandom(60) == 15 && colision) {
              this.ladoFants[cont] = lados[this.getRandom(4)];
              switch (this.ladoFants[cont]) {
                case "der":
                  this.maxS[cont] = 2;
                  this.minS[cont] = 1;
                  break;
                case "izq":
                  this.maxS[cont] = 8;
                  this.minS[cont] = 7;
                  break;
                case "arr":
                  this.maxS[cont] = 6;
                  this.minS[cont] = 5;
                  break;
                case "aba":
                  this.maxS[cont] = 4;
                  this.minS[cont] = 3;
                  break;
              }
              this.imgFants[cont] = this.minS[cont];
            }

          // Colisiones del fantasma con los objetos
          switch (this.ladoFants[cont]) {
            case "der":
              if (colision) {
                this.fantasmas[cont].px += this.velocidadFan;

              } else {
                this.fantasmas[cont].px -= this.velocidadFan * 3;
                this.ladoFants[cont] = "izq";
                this.maxS[cont] = 8;
                this.minS[cont] = 7;
                this.imgFants[cont] = this.minS[cont];

              }
              break;
            case "izq":
              if (colision) {
                this.fantasmas[cont].px -= this.velocidadFan;
              } else {
                this.fantasmas[cont].px += this.velocidadFan * 3;
                this.ladoFants[cont] = "der";
                this.maxS[cont] = 2;
                this.minS[cont] = 1;
                this.imgFants[cont] = this.minS[cont];

              }
              break;
            case "arr":
              if (colision) {
                this.fantasmas[cont].py -= this.velocidadFan;

              } else {
                this.fantasmas[cont].py += this.velocidadFan * 3;
                this.ladoFants[cont] = "aba";
                this.maxS[cont] = 4;
                this.minS[cont] = 3;
                this.imgFants[cont] = this.minS[cont];

              }
              break;

            case "aba":
              if (colision) {
                this.fantasmas[cont].py += this.velocidadFan;

              } else {
                this.fantasmas[cont].py -= this.velocidadFan * 3;
                this.ladoFants[cont] = "arr";
                this.maxS[cont] = 6;
                this.minS[cont] = 5;
                this.imgFants[cont] = this.minS[cont];

              }
              break;
          }
        }
      }, delayMover)
      this.idIntervalFantasmaMover[cont] = parseInt(idInterval.toString());
    }
  }

  dibujarFantasmas(delayDibujar: number) {
    var cont: number[] = [];
    for (let k = 0; k < this.fantasmas.length; k++) {
      cont[k] = 0;
    }
    for (let j = 0; j < this.fantasmas.length; j++) {
      var idInterval = setInterval(() => {

        if (!this.colisionFantasma(this.fantasmas[j]) && !this.choqueFantasma) {
          this.choqueFantasma = true;
          if (this.vidas.length == 1) {
            this.mover = "";
            this.muerto = true;
            this.quieto = true;
          }
          var idTimeOut = setTimeout(() => {
            this.choqueFantasma = false;
            this.vidas.pop();
            if (this.muerto) {
              this.play = false;
              this.reiniciarJuego();
            }
            window.clearTimeout(idTimeOut);
          }, this.delayChoqueFantasma);

        }
        if (cont[j] == 5) {
          if (this.imgFants[j] == this.maxS[j]) {
            this.imgFants[j] = this.minS[j];
          } else {
            this.imgFants[j]++;
          }
          cont[j] = 0;

        } else {
          cont[j]++;
        }

      }, delayDibujar)
      this.idIntervalFantasmaDibujar[j] = parseInt(idInterval.toString());
    }

  }


  // Colisiones
  colisionFantasma(fantasma: Objeto): boolean {
    if (this.jugador.id != 1 && this.jugador.px < (fantasma.px) + (fantasma.tx) &&
      this.jugador.px + this.jugador.tx > (fantasma.px) &&
      this.jugador.py < (fantasma.py) + (fantasma.ty) &&
      this.jugador.ty + this.jugador.py > (fantasma.py)) {
      return false;
    }
    return true;
  }

  colision(jugador: Objeto, tipoJugador: boolean): boolean {

    var masx = 0, masy = 0;
    if (!tipoJugador && jugador.id != 5) {
      masx = 28;
      masy = 28;
    }

    for (const obj of this.objetos) {
      if (obj.id != 1 && obj.px < (jugador.px - (masx / 2)) + (jugador.tx + (masx)) &&
        obj.px + obj.tx > (jugador.px - (masx / 2)) &&
        obj.py < (jugador.py - (masy / 2)) + (jugador.ty + (masy)) &&
        obj.ty + obj.py > (jugador.py - (masy / 2))) {
        if (tipoJugador && !this.muerto) this.quieto = true;
        return false;
      }
    }
    if (tipoJugador && !this.muerto) this.quieto = false;
    return true;
  }

  colisionPunto(jugador: Objeto, punto: Objeto): boolean {
    if (punto.id != 1 && punto.px < jugador.px + jugador.tx &&
      punto.px + punto.tx > jugador.px &&
      punto.py < jugador.py + jugador.ty &&
      punto.ty + punto.py > jugador.py) {
      return true;
    }
    return false;
  }

  colisionPuntos() {
    for (let i = 0; i < this.canrtPuntos; i++) {
      if (this.colisionPunto(this.jugador, this.puntos[i])) {
        this.puntos = this.puntos.filter((obj) => obj != this.puntos[i]);
        this.canrtPuntos--;
      }
    }

    if (this.canrtPuntos == 0) {
      if (this.canrtPuntosAnt < 20) {
        this.canrtPuntosAnt += 1;
      }

      if (this.vidas.length < this.maxVidas) {
        this.vidas[this.vidas.length] = 1;
      }

      this.canrtPuntos = this.canrtPuntosAnt;
      this.nivel += 1;
      this.inicializarPuntos();
    }
  }

  lados() {
    this.izqJugador = {
      id: 0,
      px: this.jugador.px - 5,
      py: this.jugador.py,
      tx: 5,
      ty: this.jugador.ty
    }

    this.derJugador = {
      id: 0,
      px: (this.jugador.px + this.jugador.tx),
      py: this.jugador.py,
      tx: 5,
      ty: this.jugador.ty
    }

    this.arrJugador = {
      id: 0,
      px: this.jugador.px,
      py: this.jugador.py - 5,
      tx: this.jugador.tx,
      ty: 5
    }

    this.abaJugador = {
      id: 0,
      px: this.jugador.px,
      py: (this.jugador.py + this.jugador.ty),
      tx: this.jugador.tx,
      ty: 5
    }
  }

  // Helpers
  reglaDe3(num1: number, num2: number, num3: number) {
    return (num1 * num2) / num3;
  }

  getRandom(max: number) {
    return Math.floor(Math.random() * max);
  }

  ponerPunto() {
    var objeto: Objeto = new Objeto();
    var tx = 10, ty = 10;
    objeto = {
      id: 20,
      px: this.getRandom((this.anchoTablero)) + this.marginLeft,
      py: this.getRandom((this.largoTablero - 50)) + this.marginTop,
      tx: tx,
      ty: ty
    }

    while (!this.colision(objeto, false)) {
      objeto = {
        id: 20,
        px: this.getRandom((this.anchoTablero)) + this.marginLeft,
        py: this.getRandom((this.largoTablero - 50)) + this.marginTop,
        tx: tx,
        ty: ty
      }
    }

    this.puntos[this.puntos.length] = objeto;
  }

  getKey(key: number) {
    switch (key) {
      case 97:
        if (!this.muerto) {
          this.mover = "izq";
          this.ladoDeg = 180;
          this.ponerPlay();
        }

        break;

      case 119:
        if (!this.muerto) {
          this.mover = "arr";
          this.ladoDeg = 270;
          this.ponerPlay();
        }

        break;

      case 100:
        if (!this.muerto) {
          this.mover = "der";
          this.ladoDeg = 0;
          this.ponerPlay();
        }

        break;

      case 115:
        if (!this.muerto) {
          this.mover = "aba";
          this.ladoDeg = 90;
          this.ponerPlay();
        }

        break;
      case 112:
        this.ponerPause();
        break;
    }
  }

  ponerPlay() {
    if (!this.play) {
      this.play = true;
    }
  }

  ponerPause() {
    if (this.play) {
      this.play = false;
    }
  }

  reiniciarJuego() {
    for (let i = 0; i < this.idIntervalFantasmaMover.length; i++) {
      window.clearInterval(this.idIntervalFantasmaMover[i]);
    }
    for (let j = 0; j < this.idIntervalFantasmaDibujar.length; j++) {
      window.clearInterval(this.idIntervalFantasmaDibujar[j]);
    }

    this.reiniciarVariablesJuego();
    this.inicializarFantasmas();
    this.inicializarJugador();
    this.inicializarPuntos();
    this.moverFantasmas(20, 25);
  }

  reiniciarVariablesJuego() {
    this.fantasmas = [];
    this.puntos = [];
    this.canrtPuntosAnt = 1;
    this.canrtPuntos = this.canrtPuntosAnt;
    this.idIntervalFantasmaMover = [];
    this.idIntervalFantasmaDibujar = [];
  }

  cambiarDificultad() {
    switch (this.dificultad) {
      case "Facil":
        this.busquedaDeJugador = 45;
        this.velocidadFan = 1.8;
        this.cantVidas = 4;
        this.maxVidas = 6;
        this.delayChoqueFantasma = 3000;
        break;
      case "Normal":
        this.busquedaDeJugador = 40;
        this.velocidadFan = 2;
        this.cantVidas = 3;
        this.maxVidas = 5;
        this.delayChoqueFantasma = 2500;
        break;
      case "Dificil":
        this.busquedaDeJugador = 30;
        this.velocidadFan = 2.4;
        this.cantVidas = 3;
        this.maxVidas = 3;
        this.delayChoqueFantasma = 1500;
        break;
      case "Injugable":
        this.busquedaDeJugador = 20;
        this.velocidadFan = 2.8;
        this.cantVidas = 2;
        this.maxVidas = 3;
        this.delayChoqueFantasma = 1000;
        break;
    }

    this.reiniciarJuego();
  }
}
