import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JugadorComponent } from './Components/jugador/jugador.component';
import { MapaComponent } from './Components/mapa/mapa.component';
import { FantasmaComponent } from './Components/fantasma/fantasma.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    JugadorComponent,
    MapaComponent,
    FantasmaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
