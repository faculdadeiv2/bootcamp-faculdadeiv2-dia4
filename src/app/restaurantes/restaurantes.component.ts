import { NovoRestauranteComponent } from './../novo-restaurante/novo-restaurante.component';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RestauranteComponent } from '../restaurante/restaurante.component';
import { RestaurantesService } from '../shared/restaurantes.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-restaurantes',
  templateUrl: './restaurantes.component.html',
  styleUrls: ['./restaurantes.component.scss']
})
export class RestaurantesComponent implements OnInit {

  toSearch: any = '';
  siglas: Array<any> = [];

  restaurantes: Array<any> = [];

  usuarioLogado: any;

  constructor(
    private _http: HttpClient, private dialog: MatDialog,
    private _restaurantesService: RestaurantesService,
    private _authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.listarRestaurantes();
    
    this._authService.user$
    .subscribe(userInfos => {
      this.usuarioLogado = userInfos;
    });

    this._http.get('https://servicodados.ibge.gov.br/api/v1/localidades/regioes/1|2|3|4|5/estados').subscribe((res: any) => {
      let estados = res;
      estados = estados.sort((a: any, b: any) => (a.nome > b.nome) ? 1 : -1);
      estados.forEach((estado: any) => {
        this.siglas.push({
          nome: estado.nome,
          sigla: estado.sigla
        })
      })
    })
  }

  async listarRestaurantes() {
    await this._restaurantesService.listarRestaurantes()
    .subscribe(rests => {
      this.restaurantes = rests.map(rest => rest);
      this.restaurantes = this.restaurantes.sort((a, b) => b.criadoEm.seconds - a.criadoEm.seconds);
    });
  }

  novoRestaurante(){
    this.dialog.open(NovoRestauranteComponent, {
      width: '80%',
      height: 'max-content',
      data: {
        usuario: this.usuarioLogado,
        siglas: this.siglas
      }
    });
  }

  sair() {
    this._authService.sair();
  }

  abrirRestaurante(restaurante: any) {
    this.dialog.open(RestauranteComponent, {
      width: "80%",
      height: "98vh",
      data: restaurante,
      panelClass: "custom-dialog-container"
    })
  }

}
