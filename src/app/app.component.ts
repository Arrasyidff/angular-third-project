import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { AddPlaylistComponent } from "./playlist/add-playlist/add-playlist.component";
import { UpdatePlaylistComponent } from "./playlist/update-playlist/update-playlist.component";
import { PlaylistData } from "./playlist-data";
import { OrdersComponent } from "./advanced-data";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Challenge2';
  dataPlaylist = []
  dataStore = []

  constructor(public dialog: MatDialog, private playlistData: PlaylistData,
    private ordersComponent: OrdersComponent) {
  }

  ngOnInit() {
    this.dataStore = this.ordersComponent.orders
    // console.log(this.dataPlaylist)
  }

  addPlaylist() {
    this.dialog.open(AddPlaylistComponent, { data: { name: 'fadel' } })
  }

  countDurations(songs) {
    let result = 0
    for (let i = 0; i < songs.length; i++) {
      result += songs[i].duration
    }
    return result
  }

  removePlaylist(data: any) {
    // console.log(data)
    this.ordersComponent.removeOrder(data)
    // console.log(this.ordersComponent.orders)
    this.dataStore = this.ordersComponent.orders
  }

  openUpdate(data: any) {
    let payload = {
      data
    }

    // this.dialog.open(UpdatePlaylistComponent)
    // this.dialog.open(UpdatePlaylistComponent, { data: { payload } })
    let dialogRef = this.dialog.open(UpdatePlaylistComponent, { data: { payload } })

    dialogRef.afterClosed().subscribe(result => {
      // console.log(result, "hello form parent")
      this.dataStore = this.ordersComponent.orders
    })
  }
}
