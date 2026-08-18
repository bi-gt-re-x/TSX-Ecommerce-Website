import { formatMoney } from "../../utils/money";
import axios from "axios";
import dayjs from "dayjs";

export function DeliveryOptions({ deliveryOptions, cartItem, setCart, cart, loadCart }) {
  return (
    <div className="delivery-options">
      <div className="delivery-options-title">Choose a delivery option:</div>

      {deliveryOptions.map((deliveryOption) => {
        const updateDeliveryOption = async () => {
          await axios.put(`/api/cart-items/${cartItem.productId}` , {
            deliveryOptionId: deliveryOption.id,
          });
          await loadCart();
        }

        return (
          <label key={deliveryOption.id} className="delivery-option" onClick={updateDeliveryOption}>
            <input
              type="radio"
              checked={deliveryOption.id === cartItem.deliveryOptionId}
              className="delivery-option-input"
              name={`delivery-option-${cartItem.productId}`}
              onChange={() => {
                const updatedCart = cart.map((item) => {
                  if (item.productId === cartItem.productId) {
                    return {
                      ...item,
                      deliveryOptionId: deliveryOption.id,
                    };
                  }
                  return item;
                });
                setCart(updatedCart);
              }}
            />
            <div>
              <div className="delivery-option-date">
                {dayjs(deliveryOption.estimatedDeliveryTimeMs).format(
                  "dddd, MMMM D",
                )}
              </div>
              <div className="delivery-option-price">
                {deliveryOption.priceCents === 0
                  ? "FREE Shipping"
                  : `${formatMoney(deliveryOption.priceCents)} - Shipping`}
              </div>
            </div>
          </label>
        );
      })}
    </div>
  );
}
