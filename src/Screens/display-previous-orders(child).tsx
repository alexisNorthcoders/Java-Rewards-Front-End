import {
  Text,
} from "react-native";
import { Card } from "@rneui/themed";

export default function DisplayPreviousOrders({ items }) {
  const itemsArr = items.items;

  let orderDate = new Date(items.date);
  const f = new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    day: "2-digit",
  });

  return (
    <Card
      containerStyle={{
        borderRadius: 8,
        borderColor: "#bf6420",
        borderWidth: 0.5,
      }}
    >
      <Text style={{ fontWeight: "bold" }}>
        Order Number #{items.order_id}{" "}
      </Text>
      <Text>Ordered on {f.format(orderDate)}</Text>

      {itemsArr.map((item) => {
        return (
          <Text key={item._id}>
            {item.quantity} x {item.item_name} £{item.price}
          </Text>
        );
      })}

      <Text>Total cost: £{items.totalCost}</Text>
    </Card>
  );
}
