import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, tap } from 'rxjs/operators';
import { PlayerService } from '../shared/player.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  serversList: Server[] = [{name: 'EU', id: 'eu'}, {name: 'NA', id: 'na'}, {name: 'RU', id: 'ru'}]
  
  playerSearch = this.fb.group({
    formServer: ['eu', Validators.required],
    formPlayerNickname: ['', [Validators.required, Validators.minLength(3)], ]
  });
  
  autocomplete: String[] = [];
  isLoading: boolean = false;

  constructor(private fb: FormBuilder, private playerService: PlayerService) { }

  ngOnInit(): void {
    this.playerSearch.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        tap(() => {
          this.autocomplete = [];
          console.log("here")
          this.isLoading = true;
        }),
        map(formGroupObject => {
          let query = formGroupObject.formPlayerNickname;
          // TODO here call to external service 
          let names = this.playerService.getPlayersNames(query);
          this.isLoading = false;
          return names;
        })
      )
    .subscribe(
      names => {
        this.autocomplete = names;
    });
  }

  onSubmit() {
    let selectedPlayer = this.playerSearch.controls.formPlayerNickname.value;
    if (selectedPlayer) {
      this.playerService.selectPlayer(selectedPlayer);
    }
    console.log("Submitted: " + selectedPlayer);
  }
  
}

export interface Server{name: string, id: string}
