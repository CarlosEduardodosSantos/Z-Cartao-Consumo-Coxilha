import { Component, OnInit } from '@angular/core';
import { CartaoConsumoService } from 'src/cartao-consumo.service';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { iConsumo } from '../app/iConsumo';
import { NumberFormatStyle } from '@angular/common';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'CartaoConsumoAngular';
  consumo: any;
  searchText: any;
  getValues(value: any) {
    console.warn(value);
  };
  constructor(private CartaoConsumoService: CartaoConsumoService, private router: Router) {
  }
  consumoModel: iConsumo = new iConsumo();
  consumId: any;
  getTxtValue() {
    console.warn(this.consumId);
  }


  async ngOnInit() {
    
  }


  async obterConsulById(id: any) {
    if (id != null && id != "") {
      this.CartaoConsumoService.obterConsuById(this.consumId).then(consum => { this.consumo = consum; console.log(consum) });
    }
    else {
      this.CartaoConsumoService.obterTodosConsu().then(consum => { this.consumo = consum; console.log(consum) });
    }
  }

  async deleteById(id: any)
  {
    this.CartaoConsumoService.deleteConsu(id).then(() => window.alert("Registro Deletado!"));
    location.reload();
  }

}



