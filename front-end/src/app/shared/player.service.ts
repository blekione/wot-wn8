import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class Playerservice {
    playerNamesAutocomplete: string[] = ['Dr Flen', 'Dr Dree', 'Dr Alban', 'Dr Bleki', 'FLEN', 'Bleki', 'Blaki', 'Blacki'];

    constructor(
        private httpCLient: HttpClient
    ) { }

    getPlayersNames(query: string): String[] {
        return this.filterItems(this.playerNamesAutocomplete, query);
    }

    private filterItems(arr: string[], query: string): string[] {
        return arr.filter(function (el) {
            return el.toLowerCase().indexOf(query.toLowerCase()) !== -1
        })
    }
}