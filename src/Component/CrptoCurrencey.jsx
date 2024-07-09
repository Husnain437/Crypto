import React, { useState } from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import { Card, Row, Col, Input } from 'antd'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom';
// import { useGetCryptosQuery } from '../Redux/services/CryptoApi'
const CrptoCurrencey = () => {
  const [isLoading, setIsLoading] = useState(true)
 
 
 const state = useSelector(state => state.details[0].coins);
console.log(state,'focus');

 const location = useLocation();
  const currentUrl = location.pathname; // or location.pathname + location.search for including query params
  console.log(currentUrl);
  
  const filteredCoins = currentUrl === "/" ? state.slice(0, 10) : state;
  console.log(filteredCoins,'filer');
  
  
  return (
      <>
          <Row gutter={[32,32]} className='crypto-card-container' >
              { 
                filteredCoins.map((currency)=>(
                  <Col xs={24} sm={12} lg={6}  key={currency.id} className='crypto-card' >
                      <Link to={`/crypto/${currency.uuid}`} >
                          <Card title={`${currency.rank}. ${currency.name}`} extra={<img className='crypto-image' src={currency.iconUrl} hoverable />}>
                              <p>Price: {millify(currency.price)}</p>
                              <p>Market Cap: {millify(currency.marketCap)}</p>
                              <p>Daily Change: {millify(currency.change)}%</p>
                          </Card>
                      </Link>
                  </Col>
                ))
              }
          </Row>
      </>
  )
}

export default CrptoCurrencey 