import React from "react";
import "./CartPage.css";
import { useDispatch, useSelector } from "react-redux";
import { addCartItem, removeCartItem } from "../app/features/cartSlice";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cartSlice.cartItems);

  const listCartItems = React.useMemo(() => {
    return Object.values(cartItems);
  }, [cartItems]);

  const total = listCartItems.reduce(
    (acc, item) => acc + parseFloat(item.price),
    0,
  );
  const formatPrice = (price) =>
    parseFloat(price).toLocaleString("es-MX", {
      style: "currency",
      currency: "MXN",
    });

  if (listCartItems.length === 0) {
    return (
      <div className="cart-empty">
        <p className="cart-empty-text">Tu carrito está vacío</p>
        <Link to="/" className="btn-continue">
          Seguir comprando
        </Link>
      </div>
    );
  }
  return (
    <div className="cart-page">
      <div className="cart-items">
        {listCartItems.map((item) => (
          <div key={item.uid}>
            <CardItem item={item} to={`/product/${item.slug}`} />
          </div>
        ))}
      </div>
      <div className="cart-info">
        <p className="cart-info-title">Total</p>
        <p className="cart-info-total">{formatPrice(total)}</p>
        <div className="cart-info-actions">
          <button type="button" className="btn-buy">
            Pagar
          </button>
        </div>
      </div>
    </div>
  );
};

const CardItem = ({ item = {}, to = "" }) => {
  const [quantity, setQuantity] = React.useState(item.quantity);
  const formatPrice = (price) =>
    parseFloat(price).toLocaleString("es-MX", {
      style: "currency",
      currency: "MXN",
    });
  const newPrice = (quantity) => item.productPrice * quantity;
  const dispatch = useDispatch();

  return (
    <div className="card-item-cart">
      <div className="cart-img">
        <img src={item.url_image} alt={item.name} />
      </div>
      <div className="cart-info-item">
        <Link to={to}>
          <p className="cart-title">{item.name}</p>
        </Link>

        <div className="cart-quantity">
          <button
            className="btn-quantity"
            onClick={() => {
              const newQuantity = Math.max(0, quantity - 1);
              setQuantity(newQuantity);

              if (newQuantity === 0) {
                dispatch(removeCartItem(item.uid));
                toast.error(
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <img
                      src={item.url_image}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 6,
                        objectFit: "cover",
                      }}
                    />
                    <span>
                      <b>{item.name}</b> eliminado del carrito
                    </span>
                  </div>,
                );
              } else {
                dispatch(
                  addCartItem({
                    [item.uid]: {
                      ...item,
                      ...{
                        quantity: newQuantity,
                        price: newPrice(newQuantity),
                      },
                    },
                  }),
                );
              }
            }}
          >
            −
          </button>
          <span>{quantity}</span>
          <button
            className="btn-quantity"
            onClick={() => {
              const newQuantity = Math.max(1, quantity + 1);
              setQuantity(newQuantity);
              dispatch(
                addCartItem({
                  [item.uid]: {
                    ...item,
                    ...{
                      quantity: newQuantity,
                      price: newPrice(newQuantity),
                    },
                  },
                }),
              );
            }}
          >
            +
          </button>
        </div>
      </div>

      <div className="cart-total">
        <p className="cart-total-title">Total</p>
        <p className="cart-price">{formatPrice(item.price)}</p>
      </div>
    </div>
  );
};

export default CartPage;
