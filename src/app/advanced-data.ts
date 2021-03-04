export interface Order {
  id: number;
  totalPrice: number;
  customerName: string;
  email: string;
  items: Item[];
}

export interface Item {
  category: string;
  name: string;
  price: number;
}

export class OrdersComponent {

  // use this data as mock data for the app
  orders: Order[] = [
    {
      id: 1,
      totalPrice: 246,
      customerName: 'PewDiePie',
      email: 'PewDiePie@gmail.com',
      items: [
        {
          category: 'CPU',
          name: 'AMD Ryzen 5 2600',
          price: 117
        },
        {
          category: 'Motherboard',
          name: 'MSI PRO Z390-A',
          price: 129
        },
      ]
    },
    {
      id: 2,
      totalPrice: 306,
      customerName: 'Filthy Frank',
      email: 'georgemiller@gmail.com',
      items: [
        {
          category: 'Video Card',
          name: 'ZOTAC GeForce GTX 1060',
          price: 209
        },
        {
          category: 'Memory',
          name: 'CORSAIR Vengeance RGB Pro 16GB',
          price: 97
        },
      ]
    },
  ];

  categories = ['CPU', 'Motherboard', 'Video Card', 'Memory'];

  cpuList: Item[] = [
    { category: 'CPU', name: 'AMD Ryzen 5 2600', price: 117 },
    { category: 'CPU', name: 'Intel Core i5-9600K', price: 229 },
    { category: 'CPU', name: 'AMD RYZEN 5 3600', price: 194 },
  ];

  motherBoardList: Item[] = [
    { category: 'Motherboard', name: 'MSI PRO Z390-A', price: 129 },
    { category: 'Motherboard', name: 'ASUS PRIME B360M-A', price: 84 },
    { category: 'Motherboard', name: 'ASRock B450M PRO4 AM4', price: 79 },
  ];

  videoCardList: Item[] = [
    { category: 'Video Card', name: 'ZOTAC GeForce GTX 1060', price: 209 },
    { category: 'Video Card', name: 'MSI Radeon RX 580', price: 189 },
    { category: 'Video Card', name: 'GIGABYTE GeForce RTX 2070', price: 499 },
  ];

  memoryList: Item[] = [
    { category: 'Memory', name: 'CORSAIR Vengeance RGB Pro 16GB', price: 97 },
    { category: 'Memory', name: 'G.SKILL TridentZ RGB Series 16GB', price: 86 },
    { category: 'Memory', name: 'G.SKILL Ripjaws Series 8GB', price: 42 },
  ];

  addOrder(payload) {
    let id = (this.orders.length > 0 ? this.orders[this.orders.length - 1].id + 1 : 1)
    let newData = {
      id,
      totalPrice: payload.totalPrice,
      customerName: payload.customerName,
      email: payload.email,
      items: payload.items
    }
    this.orders.push(newData)
    console.log(this.orders)
    return this.orders
  }

  removeOrder(data) {
    // console.log(data)
    let filterData = this.orders
    let newData = filterData.filter(el => el.email !== data.email)
    // console.log(newData)
    this.orders = newData
    return this.orders
  }

  updateOrder(data, id) {
    // console.log(data, id)
    let newData = {
      id,
      totalPrice: data.totalPrice,
      customerName: data.customerName,
      email: data.email,
      items: data.items
    }
    // console.log(this.orders, "before")
    let result = []
    for (let i = 0; i < this.orders.length; i++) {
      let element = this.orders[i]
      if (element.id === id) {
        element = newData
      }
      result.push(element)
    }
    // console.log(result, "after")

    this.orders = result
    return this.orders
  }
}
