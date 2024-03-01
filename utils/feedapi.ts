import axios from 'axios';


const api = axios.create({
  baseURL: "https://javarewards-api.onrender.com/"
  //baseURL: "http://192.168.248.249:9999/"

})

interface Offer {
  img?: string;
  description: string;
  date?: string;
  name?: string;
}
export function getOffers() {
  return api.get('/shops/offers')
    .then(({ data: { offers } }: { data: { offers: Offer[] } }) => {
      return offers;
    })
}
export function getMenuByEmail(email: string) {
  return api.post('/shops/email', {
    email: email,
  })
    .then(({ data: { shop } }) => {
      console.log(`fetching menu from ${email}`);

      const menu = shop[0].menu
      const menuWithQuantity = menu.map((item: {}) => ({ ...item, quantity: 0 }));
      return menuWithQuantity
    })
}
export function getOffersByEmail(email: string) {
  return api.post('/shops/email', {
    email: email,
  })
    .then(({ data: { shop } }) => {
      console.log(`fetching offers from ${email}`);

      const offers = shop[0].offers
      console.log(offers)
      return offers
    })
}

export function postOrder(order: {}) {
  return api.post('/orders', order).then(({ data }) => {
    console.log(data)
    return data.order
  })
}
export function getBusinessOrders(id: string) {

  return api.get(`/orders?shop_id=${id}`).then(({ data }) => data)
}
export function updateOrderStatus(order_id: number) {
  return api.patch('orders/status', { order_id: order_id }).then(({ data: { order } }) => order)
}

export function updateOffer(email: string, offer: {}) {
  return api.patch("/shops/offers", { email: email, offers: offer }).then(({ data }) => data.offers)
    .catch(err => {
      console.log(err)
      return err;
    })
}
export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' });
};
export function getOrdersByMonth(shop_id: string, year: string, month: string) {
  console.log("updating shop data");

  return api.get(`/orders?shop_id=${shop_id}&year=${year}&month=${month}`).then(({data:{orders}})=> orders[0].orders)
  .catch(err=> {console.log(err) 
   return err;
  })
 }

 export function getUserCoffee(email:string) {
  return api.post(`/users/email`, {email}).then(({data}) => data.user[0].coffee_count).catch((err) => console.log(err))
 }

