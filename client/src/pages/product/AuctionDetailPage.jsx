import Topbar from '../common/Topbar.jsx';
import SearchBar from '../common/SearchBar.jsx';
import FilterSidebar from '../common/FilterSideBar.jsx';
import AuctionDetail from './AuctionDetail.jsx';
import RecentViewed from '../common/RecentViewed.jsx';
import '../../styles/productDetail.css'; 

export default function AuctiontDetailPage() {
  return (
    <div className="product-detail-page-container">
      <Topbar />
      <SearchBar />
      <div className="product-detail-layout">
        <FilterSidebar />
        <AuctionDetail />
        <RecentViewed />
      </div>
    </div>
  );
}