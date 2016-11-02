import { Injectable } from '@angular/core';

export class Board {
    constructor(
        public closed: boolean,
        public desc: string,
        public id: string,
        public idOrganization: string,
        public labelNames: Object,
        public name: string,
        public shortUrl: string,
        public url: string) {}
}