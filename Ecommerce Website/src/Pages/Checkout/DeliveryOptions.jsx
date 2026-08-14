import { formatMoney } from "../../utils/money";
import dayjs from "dayjs";

export function DeliveryOptions({ deliveryOptions, cartItem }) {
  return (
    <div className="delivery-options">
      <div className="delivery-options-title">Choose a delivery option:</div>

      {deliveryOptions.map((deliveryOption) => {
        return (
          <label key={deliveryOption.id} className="delivery-option">
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
