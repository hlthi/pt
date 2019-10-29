import React, { useEffect, useState } from 'react';
import './Order.scss';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';


/**
 * Icons and Images
 */
import orderPng from '../icons/order.png';

interface IProps {}

const Order: React.FC<IProps> = props => {
  const [selectedFish, setSelectedFish] = useState<number | null>(null);
  const [quantity, setQuantity] = useState<number | null>(null);
  const [price, setPrice] = useState<number | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [isBuy, setIsBuy] = useState(true);
  const [fishes, setFishes] = useState<IFish[]>([]);

  const history = useHistory();

  useEffect(() => {
    prepareFishes();
  }, []);

  const prepareFishes = () => {
    axios.get('http://localhost:3063/v1/fish').then(res => {
      const data: IFish[] = res.data;
      console.log(data);
      setFishes(data);
    });
  };

  const sendOrder = () => {
    axios
      .post('http://localhost:3063/v1/order', {
        order_type: isBuy ? 'buy' : 'sell',
        fish_id: selectedFish,
        quantity: quantity,
        price: price,
      })
      .then(res => {
        toast.success("Success.");
        history.push("/dashboard/list")
      })
      .catch(e => {
        toast.error(e.response.data.message);
      });
  };

  return (
    <div className="new-order">
      <div className="font-40 bold-font">New Order</div>

      <div className="columns">
        <div className="column is-two-fifths">
          <div className="u-flex u-flexCol u-flexJustifyCenter">
            <div className="buttons has-addons u-marginTx">
              <button onClick={() => setIsBuy(true)} className={`button ${isBuy ? 'is-primary' : ''}`}>
                Buy
              </button>
              <button onClick={() => setIsBuy(false)} className={`button ${!isBuy ? 'is-primary' : ''}`}>
                Sell
              </button>
            </div>
            <div className="dropdown is-hoverable">
              <div className="dropdown-trigger">
                <button className="button" aria-haspopup="true" aria-controls="dropdown-menu">
                  {selectedFish === null && <span>Select Specie</span>}
                  {selectedFish !== null && <span>{fishes.filter(item => item.id === selectedFish)[0].name}</span>}
                  <span className="icon is-small">
                    <i className="icon ion-md-arrow-dropdown" aria-hidden="true" />
                  </span>
                </button>
              </div>
              <div className="dropdown-menu" id="dropdown-menu" role="menu">
                <div className="dropdown-content">
                  {fishes &&
                    fishes.map(item => (
                      <a key={item.id} className="dropdown-item" onClick={() => setSelectedFish(item.id)}>
                        {item.name}
                      </a>
                    ))}
                </div>
              </div>
            </div>
            <input
              value={quantity ? quantity : ''}
              onChange={e => {
                setQuantity(parseInt(e.target.value));
              }}
              className="input"
              type="number"
              placeholder="Quantity"
            />
            {!isBuy && (
              <input
                value={price ? price : ''}
                onChange={e => {
                  setPrice(parseInt(e.target.value));
                }}
                className="input"
                type="number"
                placeholder="Price"
              />
            )}
            <button onClick={sendOrder} className="button is-primary">
              Give Order
            </button>
          </div>
        </div>
        <div className="column is-three-fifths is-hidden-mobile">
          <div className="extra-image-area">
            <img src={orderPng} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
