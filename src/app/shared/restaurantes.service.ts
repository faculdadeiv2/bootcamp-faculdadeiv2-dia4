import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class RestaurantesService {

  private basePath = '/restaurantes';

  constructor(
    private _fireStore: AngularFirestore,
    private _fireStorage: AngularFireStorage
  ) { }

  criaRestaurante(avaliacao: any, fileUpload: any) {
    const restaurantes = this._fireStore.collection('restaurantes');
    restaurantes.add({...avaliacao, downloadUrl: fileUpload}).then(doc => doc.update({ id: doc.id }));
  }

  listarRestaurantes() {
    return this._fireStore.collection('restaurantes').valueChanges();
  }

  pushFileToStorage(avaliacao: any, fileUpload: any) {
    const filePath = `${this.basePath}/${fileUpload.name}_${avaliacao.nome}_${new Date()}`;
    const storageRef = this._fireStorage.ref(filePath);
    const uploadTask = this._fireStorage.upload(filePath, fileUpload);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          fileUpload.url = downloadURL;
          this.criaRestaurante(avaliacao, fileUpload.url);
        });
      })
    ).subscribe();
  }

  criaComentarioDousuario(idRestaurante: string, idUsuario: string, avaliacao: object) {
    return this._fireStore.collection('restaurantes')
    .doc(idRestaurante).collection('avaliações').doc(idUsuario).set(avaliacao);
  }

  listaComentariosDoRestaurante(idRestaurante: string) {
    return this._fireStore.collection('restaurantes')
    .doc(idRestaurante).collection('avaliações').valueChanges();
  }

  excluirComentario(idRestaurante: string, idUsuario: string) {
    return this._fireStore.collection('restaurantes')
    .doc(idRestaurante).collection('avaliações').doc(idUsuario).delete();
  }


  
}
