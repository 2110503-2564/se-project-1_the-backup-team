export interface Room {
  _id: string
  roomNumber: string
  capacity: number
  price: number
  facilities: string[]
}

export interface Space {
  _id: string
  name: string
  address: string
  district: string
  province: string
  postalcode: string
  tel: string
  opentime: string
  closetime: string
  rooms: Room[]
}
