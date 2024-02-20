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