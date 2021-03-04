import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormArray, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { OrdersComponent } from 'src/app/advanced-data';
import { PlaylistData } from "../../playlist-data";

@Component({
  selector: 'app-update-playlist',
  templateUrl: './update-playlist.component.html',
  styleUrls: ['./update-playlist.component.css']
})
export class UpdatePlaylistComponent implements OnInit {

  updateOrderForm = this.fb.group({
    customerName: [this.data.payload.data.customerName, [Validators.required]],
    email: [this.data.payload.data.email, [Validators.required, Validators.email]],
    items: this.fb.array(this.orderForm()),
    totalPrice: [""]
  })

  categories = []
  cpuList = []
  motherBoardList = []
  videoCardList = []
  memoryList = []

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<UpdatePlaylistComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private playlistData: PlaylistData,
    private ordersComponent: OrdersComponent) { }

  ngOnInit() {
    this.categories = this.ordersComponent.categories
    this.cpuList = this.ordersComponent.cpuList
    this.motherBoardList = this.ordersComponent.motherBoardList
    this.videoCardList = this.ordersComponent.videoCardList
    this.memoryList = this.ordersComponent.memoryList
    // console.log(this.data.payload.data, "hellooooo update")
  }

  get items() {
    return this.updateOrderForm.controls["items"] as FormArray
  }

  testingClick() {
    // console.log(this.items.controls[0].value)
    // console.log(this.items.controls)
    for (let i = 0; i < this.items.controls.length; i++) {
      const element = this.items.controls[i];
      console.log(element.value.item)
    }
  }

  orderForm() {
    let payload = this.data.payload.data.items
    let result = []
    for (let i = 0; i < payload.length; i++) {
      result.push(
        this.fb.group({
          category: [payload[i].category, [Validators.required]],
          name: [payload[i].name, [Validators.required]],
          price: ['']
        })
      )
    }
    return result
  }

  countTotalPrice(data) {
    let result = 0
    for (let i = 0; i < data.length; i++) {
      const element = data[i].value;
      result += element.price
    }
    return result
  }

  newItemForm() {
    return this.fb.group({
      category: ["", [Validators.required]],
      name: ["", [Validators.required]],
      price: ["", [Validators.required]]
    })
  }

  addSong() {
    this.items.push(this.newItemForm())
  }

  submitUpdate() {
    // console.log(this.updateOrderForm.value)
    this.ordersComponent.updateOrder(this.updateOrderForm.value, this.data.payload.data.id)
    this.updateOrderForm.reset()
    this.dialogRef.close()
  }

  deleteSong(i) {
    this.items.removeAt(i)
  }

  close() {
    this.dialogRef.close()
  }

}
