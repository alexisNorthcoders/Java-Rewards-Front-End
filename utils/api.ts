import axios from 'axios';

const api = axios.create({
  baseURL: "https://javarewards-api.onrender.com/"
})

interface SuccessfulUserPost {
  data: {
    user: {
    _id: string,
    age?: number,
    avatar_url?: string,
    coffee_count: number,
    email: string,
    name?: string
    }
  }
}

interface ShopType {
      email: string
      avatar_url: string
      location: {
        lat: number,
        long: number
      },
      description: string
}

export function postNewUser(name: string, age: number, email: string, avatar_url: string) {
  return api.post('/users', {name, age, email, avatar_url})
    .then((res: SuccessfulUserPost) => {
      return res.data
    })
}

export function postNewShop(name: string, email: string, lat: number, long: number, description: string, avatar_url: string) {
  return api.post('/shops', { name, email, lat , long, description , avatar_url})
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      console.log(err)
    })
}

export function getShopData(email: string) {
  return api.post('/shops/email', {email: email}).then((res) => {
   return res.data.shop[0]
  })
  .catch((err) => {
    console.log(err)
  })
}

export function updateShopData({
      email,
      avatar_url,
      location,
      description,
}:ShopType) {
  return api.patch('/shops/email', {email, avatar_url, location, description})
}

export function getOrdersByShopId(id: number) {
  return api.get(`/orders?shop_id=${id}`)
}

export function addMenuItem(email: string, menu:[], newMenuItem:{}) {
  const newMenu = [...menu, newMenuItem]
  return api.patch('/shops/menu', {email, menu: newMenu})
}

export async function getItemsByShopId(id: number) {
  const {data} = await api.get(`/orders/total/${id}`)
    return data
}