import React, { useEffect, useState } from 'react';
import './Market.scss';
import axios from 'axios';
import 'react-table/react-table.css';
import ReactTable from 'react-table';
import { Link, useHistory } from 'react-router-dom';



interface IProps {}

const columns = [
  {
    Header: 'Name',
    accessor: 'name',
    filterMethod: (filter: any, row: any) => {
      const rowData: string = row[filter.id];
      const filterValue: string = filter.value;

      return rowData.toLocaleLowerCase().includes(filterValue.toLocaleLowerCase());
    },
    filterable: true,
  },
  {
    Header: 'Stock',
    accessor: 'stock_amount',
    filterable: false,
  },
  {
    Header: 'Price',
    accessor: 'price',
    filterable: false,
  },
  {
    Header: 'Image',
    accessor: 'image_url',
    filterable: false,
    Cell: (props: any) => {
      const image_url = props.value;
      console.log(props);
      return (
        <div className="mini-image">
          <img src={image_url} />
        </div>
      );
    },
  },
  {
    Header: 'Price',
    accessor: 'price',
    filterable: false,
    Cell: (props: any) => (
      <div>
        <div className="buttons has-addons u-flex u-flexJustifyCenter">
          <button className={`button is-light`}>Buy</button>
          <button className={`button is-dark`}>Sell</button>
        </div>
      </div>
    ),
  },
  {
    Header: '',
    accessor: 'fish_id',
    filterable: false,
    Cell: (props: any) => (
      <div>
        <Link className="u-paddingHs" to={`/dashboard/edit/${props.value}`}>
          E
        </Link>
      </div>
    ),
  },
];

const Market: React.FC<IProps> = props => {
  const [stockData, setStockData] = useState<IStock[]>([]);
  const history = useHistory();

  useEffect(() => {
    prepareStockData();
  }, []);

  /**
   * Prepare stock data
   */
  const prepareStockData = () => {
    axios.get('http://localhost:3063/v1/stock').then(res => {
      const data: IStock[] = res.data;
      setStockData(data);
    });
  };

  return (
    <div className="market-container">
      <div className="u-flex u-flexJustifyBetween u-flexAlignItemsCenter">
        <div className="font-40 bold-font">Market</div>
        <a onClick={prepareStockData}>
          <i className="icon font-30 ion-md-refresh-circle u-marginLx" aria-hidden="true" />
        </a>
      </div>

      <ReactTable pageSize={10} data={stockData} columns={columns} />
    </div>
  );
};

export default Market;
