import React,{useEffect,useState} from 'react'
import millify from 'millify'
import { Typography,Row,Col,Statistic } from 'antd'
import { Link } from 'react-router-dom'
import CrptoCurrencey from './CrptoCurrencey'
import News from './News'
import '../App.css'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addCryptoItem,resetState,CryptoNews } from '../Redux/Reducer/ApiCall'
const HomePage = () => {
        const dispatch = useDispatch();
        const [data, setData] = useState(null);
        const [topTen,setTopTen] = useState(null)
         const [loading, setLoading] = useState(true);
         const [news,setNews] = useState(null)
         const [newsLoading, setNewsLoading] = useState(true) 

         const fetchData = async () => {
          try {
            const response = await axios.get("https://coinranking1.p.rapidapi.com/coins", {
              headers: {
                'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
                'x-rapidapi-key': '9c600cf825msh51d3cb6d94aa290p1e51ddjsn3fd1d8b7d158'
              }
            });
            setData(response.data.data);

          } catch (error) {
            console.error('Error fetching data:', error);
          } finally {
            setLoading(false);
          }
        };

        //  const fetchNewsData = async ()=>{
        //   try{
        //     const response = await axios.get('https://bing-news-search1.p.rapidapi.com/news',{
        //       headers: {
        //         'X-BingApis-SDK': 'true',
        //         'X-RapidAPI-Key': '9c600cf825msh51d3cb6d94aa290p1e51ddjsn3fd1d8b7d158',
        //         'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
        //       }
        //     })
        //     setNews(response.data.data)
        //   }
        //   catch (error) {
        //     console.error('Error fetching data:', error);
        //   } finally {
        //     setNewsLoading(false);
        //   }
        // }

        useEffect(() => {
            
        
            fetchData();
          }, []); 
          dispatch(resetState())
            dispatch(addCryptoItem(data))
            dispatch(CryptoNews(news))
          console.log(data,'imdata');
          console.log(news,'im news');
     
          if(loading) return 'Loading....'

  return (
  
    <>
        <Typography.Title level={2} className='heading'>
            Global Crypto Stats
        </Typography.Title>
        <Row>
            <Col span={12} >
                <Statistic  title='Total Crypto Currenceies' value={millify(data.stats.total)} />
            </Col>
            <Col span={12} >
                <Statistic  title='Total Exchanges' value={millify(data.stats.totalExchanges)} />
            </Col>
            <Col span={12} >
                <Statistic  title='Total Market Cap' value={millify(data.stats.totalMarketCap)} />
            </Col>
            <Col span={12} >
                <Statistic  title='Total 24Hour Volume' value={millify(data.stats.total24hVolume)} />
            </Col>
            <Col span={12}>
                <Statistic  title='Total Markets' value={millify(data.stats.totalMarkets)} />
            </Col>
        </Row>

        <div className='home-heading-container'>
                <Typography.Title level={2} className='home-title'>
                        Top 10 CrptoCurrenceies in the World
                </Typography.Title>
                <Typography.Title level={3} className='show-more'>
                        <Link to='/cryptocurrencey' >Show More</Link>
                </Typography.Title>
        </div>
        <CrptoCurrencey  />
        <div className='home-heading-container'>
                <Typography.Title level={2} className='home-title'>
                        Latest Crypto News
                </Typography.Title>
                <Typography.Title level={3} className='show-more'>
                        <Link to='/news' >Show More</Link>
                </Typography.Title>
        </div>
        <News simplified/>
    </>
  )
}

export default HomePage