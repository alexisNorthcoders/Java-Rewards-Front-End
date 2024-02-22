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


