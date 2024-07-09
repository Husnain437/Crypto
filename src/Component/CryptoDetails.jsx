import React, { useState,useEffect } from 'react'
import HTMLReactParser from 'html-react-parser/lib/index'
import { useParams } from 'react-router-dom'
import millify from 'millify'
import { Col, Row,Typography,Select } from 'antd'
import LineChart from './LineChart'
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';
import axios from 'axios'




const CryptoDetails = () => {
  const { Title, Text } = Typography;
  const { Option } = Select;
  const [coin,setCoin] = useState()
  const [coinLoading, setCoinLoading] = useState(true)
  const [timePeriods, setTimePeriods] = useState('7d')
  const [coinHistory, setCoinHistory] = useState(null)
  const [historyLoading, setHistoryLoading] = useState(true)
  const {coinId} = useParams()

  
     const cryptoInfo = async ()=>{
            try{
              const response = await axios.get(`https://coinranking1.p.rapidapi.com/coin/${coinId}`,{
                params: {
                  referenceCurrencyUuid: 'yhjMzLPhuIDl',
              
                },
                headers: {
                  'X-RapidAPI-Key': '9c600cf825msh51d3cb6d94aa290p1e51ddjsn3fd1d8b7d158',
                  'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
                }
              })
              setCoin(response.data.data)
            }
            catch (error) {
              console.error('Error fetching data:', error);
            } finally {
              setCoinLoading(false);
            }
           
     }
     console.log(coin,' coin details');
    

     const cryptoHistory = async()=>{
      try{

            const response = await axios.get(`https://coinranking1.p.rapidapi.com/coin/${coinId}/history`,{
              params: {
                referenceCurrencyUuid: 'yhjMzLPhuIDl',
                timePeriod: timePeriods 
              },
              headers: {
                'X-RapidAPI-Key': '9c600cf825msh51d3cb6d94aa290p1e51ddjsn3fd1d8b7d158',
                'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
              }
            })

            setCoinHistory(response.data.data)
          
      }
      catch(error){
        console.error('Error fetching data:', error);
      }
      finally{
            setHistoryLoading(false)
      }
     }

  useEffect(() => {
    cryptoInfo();
    cryptoHistory()
   }, [timePeriods]);

   console.log(timePeriods,'timetimetime');

   if(coinLoading) return 'Loading......'
   if(historyLoading) return'Loading.......'

    const cryptoDetails =  coin.coin;

   const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

   const stats = [
     { title: 'Price to USD', value: `$ ${cryptoDetails.price && millify(cryptoDetails.price)}`, icon: <DollarCircleOutlined /> },
     { title: 'Rank', value: cryptoDetails.rank, icon: <NumberOutlined /> },
     { title: '24h Volume', value: `$ ${cryptoDetails.volume && millify(cryptoDetails.volume)}`, icon: <ThunderboltOutlined /> },
     { title: 'Market Cap', value: `$ ${cryptoDetails.marketCap && millify(cryptoDetails.marketCap)}`, icon: <DollarCircleOutlined /> },
     { title: 'All-time-high(daily avg.)', value: `$ ${millify(cryptoDetails.allTimeHigh.price)}`, icon: <TrophyOutlined /> },
   ];
 
   const genericStats = [
     { title: 'Number Of Markets', value: cryptoDetails.numberOfMarkets, icon: <FundOutlined /> },
     { title: 'Number Of Exchanges', value: cryptoDetails.numberOfExchanges, icon: <MoneyCollectOutlined /> },
     { title: 'Aprroved Supply', value: cryptoDetails.approvedSupply ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
     { title: 'Total Supply', value: `$ ${millify(cryptoDetails.totalSupply)}`, icon: <ExclamationCircleOutlined /> },
     { title: 'Circulating Supply', value: `$ ${millify(cryptoDetails.circulatingSupply)}`, icon: <ExclamationCircleOutlined /> },
   ];
 



  return (
   
   <Col className="coin-detail-container">
      <Col className="coin-heading-container">
        <Title level={2} className="coin-name">
          {cryptoDetails.name} ({cryptoDetails.symbol}) Price
        </Title>
        <p>{cryptoDetails.name} live price in US Dollar (USD). View value statistics, market cap and supply.</p>
      </Col>
      <Select defaultValue="3h" className="select-timeperiod" placeholder="Select Timeperiod" onChange={(value) => setTimePeriods(value)}>
        {time.map((date) => <Option key={date} value={date} >{date}</Option>)}
      </Select>
      <LineChart coinHistory={coinHistory} currentPrice={millify(cryptoDetails.price)} coinName={cryptoDetails.name} />
      <Col className="stats-container">
        <Col className="coin-value-statistics">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">{cryptoDetails.name} Value Statistics</Title>
            <p>An overview showing the statistics of {cryptoDetails.name}, such as the base and quote currency, the rank, and trading volume.</p>
          </Col>
          {stats.map(({ icon, title, value }) => (
            <Col className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
        <Col className="other-stats-info">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">Other Stats Info</Title>
            <p>An overview showing the statistics of {cryptoDetails.name}, such as the base and quote currency, the rank, and trading volume.</p>
          </Col>
          {genericStats.map(({ icon, title, value }) => (
            <Col className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
      </Col>
      <Col className="coin-desc-link">
        <Row className="coin-desc">
          <Title level={3} className="coin-details-heading">What is {cryptoDetails.name}?</Title>
          {HTMLReactParser(cryptoDetails.description)}
        </Row>
        <Col className="coin-links">
          <Title level={3} className="coin-details-heading">{cryptoDetails.name} Links</Title>
          {cryptoDetails.links?.map((link) => (
            <Row className="coin-link" key={link.name}>
              <Title level={5} className="link-name">{link.type}</Title>
              <a href={link.url} target="_blank" rel="noreferrer">{link.name}</a>
            </Row>
          ))}
        </Col>
      </Col>
    </Col>
  );
}


export default CryptoDetails