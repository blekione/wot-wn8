import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { AbstractControl } from "@angular/forms";

@Injectable({
    providedIn: 'root'
})
export class PlayerService {
    
    playerNamesAutocomplete: string[] = ['Dr Flen', 'Dr Dree', 'Dr Alban', 'Dr Bleki', 'FLEN', 'Bleki', 'Blaki', 'Blacki'];

    selectedPlayer: EventEmitter<String> = new EventEmitter<String>();

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

    selectPlayer(playerName: String) {
        this.selectedPlayer.emit(playerName);
      }
}