import axios from 'axios';

const api = axios.create({
  baseURL: "http://192.168.100.20:9999/"
})

export function postNewUser(name: string, age: number, email: string, avatar_url: string) {
  return api.post('/users', {name, age, email, avatar_url})
    .then((res: any) => {
      console.log(res)
    })
}