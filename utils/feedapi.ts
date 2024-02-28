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
export function getMenuByEmail(email:string) {
  return api.post('/shops/email',{
    email: email,
  })
  .then(({data:{shop}}) => {
    console.log(`fetching menu from ${email}`);
    
    const menu = shop[0].menu
    const menuWithQuantity = menu.map((item: {}) => ({ ...item, quantity: 0 }));
    return menuWithQuantity
    })
}
export function postOrder(order:{}){
  return api.post('/orders',order).then(({data}) => {
    console.log(data)
    return data.order})
}
export function getBusinessOrders(id){
  console.log(id,"   getBusinessORders in api utils")
  return api.get(`/orders?shop_id=${id}`).then(({data}) => data)
}
export function updateOrderStatus(order_id:number){
  return api.patch('orders/status',{order_id:order_id}).then(({data:{order}})=> order)
}

export function updateOffer(email,offer:{}){
 return api.patch("/shops/offers",{email:email,offers:offer}).then(({data})=> data.offers)
 .catch(err=> {console.log(err) 
  return err;
 })
}
export const formatDate = (dateString) => {
  const date = new Date(dateString);
 return date.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' });
};
export function getOrdersByMonth(shop_id,year,month:{}){
  console.log("updating shop data");
  

  return api.get(`/orders?shop_id=${shop_id}&year=${year}&month=${month}`).then(({data:{orders}})=> orders[0].orders)
  .catch(err=> {console.log(err) 
   return err;
  })
 }