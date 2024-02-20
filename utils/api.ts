import axios from 'axios';

const api = axios.create({
  baseURL: "https://javarewards-api.onrender.com/"
})

export function postNewUser(name: string, age: number, email: string, avatar_url: string) {
  return api.post('/users', {name, age, email, avatar_url})
    .then((res: any) => {
      console.log(res.data)
    })
}