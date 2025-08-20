import Header from '../common/Header.jsx'
import SearchBar from '../common/SearchBar.jsx';
import FilterSidebar from '../common/FilterSideBar.jsx';
import ProductDetail from './ProductDetail.jsx';
import RecentViewed from '../common/RecentViewed.jsx';
import '../../styles/productDetail.css'; 

export default function ProductDetailPage() {
  return (
    <div className="product-detail-page-container">
      <Header />
      <SearchBar />
      <div className="product-detail-layout">
        <FilterSidebar />
        <ProductDetail />
        <RecentViewed />
      </div>
    </div>
  );
}