import smallOrderData from '@/src/mock/small/orders.json';

type UserDetailParams = {
  params: {
    userId: string;
  };
};
type Orders = typeof smallOrderData;

// TODO: might be nice to have an api for this at some point
const createUserOrderMap = (orders: Orders): Map<string, Orders> => {
  const userOrders = new Map<string, Orders>();
  orders.forEach((order) => {
    userOrders.has(order.user) ? userOrders.get(order.user)!.push(order) : userOrders.set(order.user, [order]);
  });

  return userOrders;
};

const currencyFormatter = (amount: number | string) => {
  const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
  return formatter.format(+amount);
};

export default function userOrderDetail(props: UserDetailParams) {
  const userOrders = createUserOrderMap(smallOrderData).get(props.params.userId);

  if (!userOrders) {
    return <p>User not Found</p>;
  }

  return (
    <div className='flex min-h-screen flex-col p-24'>
      {userOrders.map((order, index) => {
        console.log(userOrders);
        return (
          <div key={`${order.user}-${index}`}>
            <h1 className='text-2xl font-semibold'>Order #{index + 1}</h1>
            <h3 className={`mb-3 text-xl `}>Total: {currencyFormatter(order.total)}</h3>
          </div>
        );
      })}
    </div>
  );
}
