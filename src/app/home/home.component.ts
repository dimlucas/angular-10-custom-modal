import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '@environments/environment';
import { DataService } from "../services/data.service";

import { ModalService } from '../_modal';

@Component({ 
    selector: "home",
    templateUrl: 'home.component.html' 
})
export class HomeComponent implements OnInit {
    bodyText: string;

    constructor(
        private modalService: ModalService,
        private _dataService: DataService,
        private _httpClient: HttpClient
    ) { }

    async ngOnInit() {
        this.bodyText = 'This text can be updated in modal 1';
        let response = await this._httpClient.get("https://jsonplaceholder.typicode.com/todos/").toPromise();
        console.log(response);
    }

    openModal(id: string) {
        this.modalService.open(id);
    }

    closeModal(id: string) {
        this.modalService.close(id);
    }

    changeText() {
        this.bodyText = "SOMETHING ELSE"
    }
}