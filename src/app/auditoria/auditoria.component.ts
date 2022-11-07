import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartaoConsumoService } from 'src/cartao-consumo.service';

@Component({
  selector: 'app-auditoria',
  templateUrl: './auditoria.component.html',
  styleUrls: ['./auditoria.component.scss']
})
export class AuditoriaComponent implements OnInit {

  constructor(private CartaoConsumoService: CartaoConsumoService,
    private router: Router) { }

    dataagora = new Date().toISOString().substring(0, 10);
    auditoria: any;

    async ngOnInit(){
      await this.CartaoConsumoService.obterTudoAuditoria().then((aud) => {
        this.auditoria = aud;
      });
      console.log(this.dataagora);
      console.log(this.auditoria);
        }
      
  converterLongDate(data: any) {
    let dataFormatada = new Date(data).toLocaleString();;
    return  dataFormatada;
  }

  
  async searchByDate(data: any) {
    await this.CartaoConsumoService.obterAuditoriaData(data).then((aud) => {
      this.auditoria = aud;
    });
  }

  printThisPage() {
    window.print();
  }

  converterCurrency(valor: number) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(valor);
  }

  gotoCadastro() {
    this.router.navigate(['/admin']);
  }
}
