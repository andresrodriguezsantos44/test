/* tslint:disable */
import {Component, OnInit} from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'ADN-FRONT';
  arrayData = [];
  url = 'https://back-task-api.herokuapp.com/api/';
  formData = {
    titulo: '',
    descripcion: '',
    terminada: '',
    expira: '',
    nombre: ''
  };
  isUpdate = false;
  rowId = '';

  constructor() {
  }


  ngOnInit() {
    this.getData();
  }

  getData(): void {
    axios.get(this.url)
      .then((response) => {
        // @ts-ignore
        this.arrayData = response.data;
      })
      .catch((error) => {
      });
  }

  pushData(): void {
    axios.post(this.url, this.formData)
      .then((response) => {
        this.getData();
        this.isUpdate = false;
        this.clearData();
      })
      .catch((error) => {
      });
  }

  deleteData(id): void {
    axios.delete(this.url + id)
      .then((response) => {
        this.isUpdate = false;
        this.getData();
      })
      .catch((error) => {
      });
  }

  setData(id) {
    const data: any = this.arrayData.filter(x => x.id == id)[0];
    this.isUpdate = true;
    this.rowId = id;
    this.formData = {
      titulo: data.titulo,
      descripcion: data.descripcion,
      terminada: data.terminada,
      expira: data.expira,
      nombre: data.nombre
    };
  }

  updateData(): void {
    axios.put(this.url + this.rowId, this.formData)
      .then((response) => {
        this.isUpdate = false;
        this.getData();
        this.clearData();
      })
      .catch((error) => {
      });
  }

  clearData() {
    this.formData = {
      titulo: '',
      descripcion: '',
      terminada: '',
      expira: '',
      nombre: ''
    };
  }

  parserNumber(number) {
    return parseInt(number);
  }

}
