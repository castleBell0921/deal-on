import Header from '../../common/Header';
import SearchBar from '../../common/SearchBar';
import RecentViewed from '../../common/RecentViewed';

const ProductItem = ({ product }) => {
    const productId = product.PRODUCT_NO; // key로 사용할 고유 ID
    const productName = product.NAME     || '상품명 없음';
    const productStartPrice = product.START_PRICE; 
    const productCurrentPrice = product.CURRENT_PRICE;
    const productLocation = product.SALES_LOCATION|| '위치 정보 없음'; // 백엔드 컬럼명은 SALES_LOCATION이었음
    const koreanLocation = productLocation.match(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]+/g)?.join(' ') || '';
    const productCreateDate = product.CREATE_DATE || '날짜 정보 없음'; // 날짜도 백엔드에서 넘어오는 포맷 그대로
    const productViews = product.VIEWS || 0; // 조회수
    const image = product.IMAGE_URL;
    return (
        <div className="product-item">
            <div className="product-image-placeholder" style={{ backgroundImage: `url(${image})`, backgroundSize:'cover'}}>
                </div> {/* 회색 사진 박스 */}
            <div className="product-details">
                <div className="product-title text-16px">{productName}</div>
                <div className="product-price text-16px">시작가격: {productStartPrice}원</div>
                <div className="product-price text-16px">현재가격: {productCurrentPrice}원</div>
                <div className="product-meta text-12px">
                    <span>{koreanLocation}</span>
                    <br />
                    <span>{productCreateDate}</span>
                    <br />
                    <span className="meta-likes">찜 {productViews}</span>
                    <br/>
                </div>
            </div>
        </div>
    );
};

const AuctionProductPresenter = ({products}) => {
   return (
           <div className="home-page-container">
               <div className="home-content-layout">                
                   <main className="home-main-content">
                       <section className="product-section">
                           <h2 className="section-title text-46px">경매상품</h2>
                           <div className="product-list">
                                {products.map((product, index) => (
                               <ProductItem key={product.NO || `product-${index}`} product={product} />
                           ))}
                           </div>
                           <button className="more-button text-16px">더보기</button>
                       </section>
   
                   </main>
                   <RecentViewed />
               </div>
           </div>
       );
   }


export default AuctionProductPresenter;