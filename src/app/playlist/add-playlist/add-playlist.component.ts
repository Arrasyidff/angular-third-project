import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from "@angular/material";
import { FormBuilder, FormArray, Validators, FormControl } from "@angular/forms";
import { PlaylistData } from "../../playlist-data";
import { OrdersComponent } from "../../advanced-data";

@Component({
  selector: 'app-add-playlist',
  templateUrl: './add-playlist.component.html',
  styleUrls: ['./add-playlist.component.css']
})
export class AddPlaylistComponent implements OnInit {

  addOrderForm = this.fb.group({
    customerName: ["", [Validators.required]],
    email: ["", [Validators.required, Validators.email]],
    items: this.fb.array([this.songForm()]),
    totalPrice: [""]
  })
  categories = []
  cpuList = []
  motherBoardList = []
  videoCardList = []
  memoryList = []


  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddPlaylistComponent>,
    private fb: FormBuilder,
    private playlistData: PlaylistData,
    private ordersComponent: OrdersComponent ) { }

  ngOnInit() {
    this.categories = this.ordersComponent.categories
    this.cpuList = this.ordersComponent.cpuList
    this.motherBoardList = this.ordersComponent.motherBoardList
    this.videoCardList = this.ordersComponent.videoCardList
    this.memoryList = this.ordersComponent.memoryList
  }

  get items() {
    return this.addOrderForm.controls["items"] as FormArray
  }

  countTotalPrice(data) {
    let result = 0
    for (let i = 0; i < data.length; i++) {
      const element = data[i].value;
      result += element.price
    }
    return result
  }

  songForm() {
    return this.fb.group({
      category: ["", [Validators.required]],
      name: ["", [Validators.required]],
      price: [""]
    })
  }

  testingClick() {
    // console.log(this.items.controls[0].value)
    // console.log(this.addOrderForm.value)
  }

  addSong() {
    this.items.push(this.songForm())
  }

  deleteSong(i) {
    this.items.removeAt(i)
  }

  close() {
    this.dialogRef.close()
  }

  submitPlaylist() {
    this.ordersComponent.addOrder(this.addOrderForm.value)
    // console.log(this.playlistData.playlists)
    this.addOrderForm.reset()
    this.dialogRef.close()
  }

}
