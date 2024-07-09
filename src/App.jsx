import React from 'react'
import { Route,Link, Router, Routes } from 'react-router-dom'
import { Layout, Typography, Space } from 'antd'
import Navbar from './Component/Navbar'
import CrptoCurrencey from './Component/CrptoCurrencey'
import Exchanges from './Component/Exchanges'
import CryptoDetails from './Component/CryptoDetails'
import News from './Component/News'
import HomePage from './Component/HomePage'

const App = () => {
  return (
    <div className='app'> 
        <div className='navbar'>
          <Navbar/>
        </div>
        <div className='main'>
            <Layout>
              <div className='routes'>
                  <Routes>
                    <Route exact path='/' element={<HomePage/>} ></Route>
                    <Route exact path='/exchange' element={<Exchanges/>} ></Route>
                    <Route exact path='/cryptocurrencey' element={<CrptoCurrencey/>} ></Route>
                    <Route exact path='/crypto/:coinId' element={<CryptoDetails/>} >  </Route>
                    <Route exact path='/news' element={<News/>} >  </Route>
                  </Routes>
              </div>
            </Layout>
        
        <div className='footer'>
            <Typography.Title level={5} style={{color: 'white', textAlign:'center'}} >
              CryptoVerse <br/>
              All Rights Reserved
            </Typography.Title>
            <Space>
              <Link to='/' >Home</Link>
              <Link to='/exchange' >Exchanges</Link>
              <Link to='/ews' >News</Link>


            </Space>
            </div>
        </div>
    </div>
  )
}

export default App