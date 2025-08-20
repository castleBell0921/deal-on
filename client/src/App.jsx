import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home/HomeContainer.jsx'
import SignUp from './pages/user/signUp/SignUpContainer.jsx'

import ProductDetailPage from './pages/product/ProductDetailPage.jsx'
import AuctionDetailPage from './pages/product/AuctionDetailPage.jsx'
import AuctionForm from './pages/product/AuctionForm.jsx'
import ProductForm from './pages/product/ProductForm.jsx'
import MyPage from './pages/user/myPage/myPageContainer.jsx'
import AuctionProduct from './pages/product/AuctionProduct/AuctionProductContainer.jsx'
import NormalProduct from './pages/product/NormalProduct/NormalProductContainer.jsx'
import AllProduct from './pages/product/AllProduct/AllProductContainer.jsx'
import Header from './pages/common/Header.jsx'
import SearchBar from './pages/common/SearchBar.jsx'

import './styles/font.css';



const App = () => {
  return (
      <BrowserRouter>
        <div className="app-container">
          <Header/>
          <SearchBar/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/productDetail" element={<ProductDetailPage />} />
            <Route path="/auctionDetail" element={<AuctionDetailPage />} />
            <Route path="/auctionForm" element={<AuctionForm />}/>
            <Route path="/productForm" element={<ProductForm />}/>
            <Route path="/myPage" element={<MyPage />}/>
            <Route path="/products/auctionProduct" element={<AuctionProduct/>}/>
            <Route path="/products/normalProduct" element={<NormalProduct/>}/>
            <Route path="/products/allProduct" element={<AllProduct/>}/>
            {/* 다른 라우트들도 여기에 위치 */}
          </Routes>
        </div>
      </BrowserRouter>
  )
};

export default App

