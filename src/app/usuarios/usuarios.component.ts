import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CartaoConsumoService } from 'src/cartao-consumo.service';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { iConsumo } from '../iConsumo';
import { NumberFormatStyle } from '@angular/common';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { iMov } from '../iMov';
import { iMovXandao } from '../iMovXandao';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent implements OnInit {
  constructor(
    private CartaoConsumoService: CartaoConsumoService,
    private router: Router
  ) {}
  usuarios: any;
  usuario: any = '';
  tipo: any = 3;
  acao: any;

  async ngOnInit() {
    await this.CartaoConsumoService.obterUsuarios().then((users) => {
      this.usuarios = users;
    });
    console.log(this.usuarios);
  }

  converteTipo(tipo: any) {
    if (tipo == 1) return 'Administrador';
    else return 'Caixa';
  }

  async onSubmit(data: any) {
    if (this.acao == false) {
      if (data.login != '' && data.senha != '' && data.tipo != '') {
        data.restauranteId = environment.resId;
        await this.CartaoConsumoService.salvarUsuario(data);
        console.log(data);
        location.reload();
      } else {
        window.alert('Por favor preencha todos os Campos!');
      }
    } else if (this.acao == true) {
      if (data.login != '' && data.senha != '' && data.tipo != '') {
        data.restauranteId = environment.resId;
        data.usuarioId = this.usuario.usuarioId;
        await this.CartaoConsumoService.alterarUsuario(data);
        console.log(data);
        location.reload();
      } else {
        window.alert('Por favor preencha todos os Campos!');
        console.log(data);
      }
    }
  }

  async deleteUser(id: any) {
    await this.CartaoConsumoService.usuarioDelete(id);
    location.reload();
  }

  editar() {
    this.acao = true;
  }

  inserir() {
    this.acao = false;
  }

  async findUser(id: any) {
    await this.CartaoConsumoService.usuarioPorCodigo(id).then((user) => {
      this.usuario = user;
    });
    console.log(this.usuario);
  }

  voltarLogin() {
    this.router.navigate(['/admin/']);
  }
}
