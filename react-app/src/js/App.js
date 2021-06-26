import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import '../css/App.css';
// パーツ読み込み
import Main from './Main';
import Header from './Header';
import Footer from './Footer';
import {BackTopBtn} from '../js/components/Btn';


// 画面のsサイズ調節
const setFillHeight = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
// 画面のサイズ変動があった時に高さを再計算する
window.addEventListener('resize', setFillHeight);
// 初期化
setFillHeight();



const App = () =>{


  return (
  <BrowserRouter>
    <div className="App">
      <Header/>
      <Main />
      <Footer />
      <BackTopBtn />
    </div>
  </BrowserRouter>
)

}

export default App
