import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from "@angular/fire/storage";

// Requisições HttpClient
import { HttpClientModule } from '@angular/common/http';

// material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';

// Componentes
import { RestaurantesComponent } from './restaurantes/restaurantes.component';
import { NovoRestauranteComponent } from './novo-restaurante/novo-restaurante.component';
import { RestauranteComponent } from './restaurante/restaurante.component';
import { environment } from 'src/environments/environment.prod';
import { FiltroRestaurantePipe } from './shared/filtro-restaurante.pipe';
import { LoginPageComponent } from './login-page/login-page.component';

//Tradução
import { registerLocaleData } from '@angular/common';
import localeBr from '@angular/common/locales/pt';

registerLocaleData(localeBr, 'pt')

@NgModule({
  declarations: [
    AppComponent,
    RestaurantesComponent,
    NovoRestauranteComponent,
    RestauranteComponent,
    FiltroRestaurantePipe,
    LoginPageComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    // Firebase
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),

    //Forms
    ReactiveFormsModule,
    FormsModule,

    // material
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
