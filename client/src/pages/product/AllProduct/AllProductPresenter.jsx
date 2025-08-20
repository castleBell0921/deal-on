import React from 'react';
import { useNavigate } from 'react-router-dom';
import RecentViewed from '../../common/RecentViewed';
import '../../../styles/Home.css';


// 임시 상품 아이템 컴포넌트 더미
// const DummyProductItem = () => {
//     return (
//         <div className="product-item">
//             <div className="product-image-placeholder"></div> {/* 회색 사진 박스 */}
//             <div className="product-details">
//                 <div className="product-title text-16px">[90] 칩스토어 뉴욕 항공점퍼</div>
//                 <div className="product-price text-16px">5,900 원</div>
//                 <div className="product-meta text-12px">
//                     <span>이태원동</span>
//                     <span>1일 전</span>
//                     <span className="meta-likes"> {/* 좋아요 아이콘이나 텍스트 */}
//                         찜 8
//           </span>
//                 </div>
//             </div>
//         </div>
//     );
// };

const ProductItem = ({ product }) => {
    const productId = product.PRODUCT_NO; // key로 사용할 고유 ID
    const productName = product.NAME     || '상품명 없음';
    const productPrice = product.CURRENT_PRICE_UNIFIED; // toLocaleString을 위해 숫자인지 확인 필요
    const productLocation = product.LOCATION || '위치 정보 없음'; // 백엔드 컬럼명은 SALES_LOCATION이었음
    const koreanLocation = productLocation.match(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]+/g)?.join(' ') || '';
    const productCreateDate = product.CREATE_DATE || '날짜 정보 없음'; // 날짜도 백엔드에서 넘어오는 포맷 그대로
    const productViews = product.VIEWS || 0; // 조회수
    const image = product.IMAGE_URL;
    const productType = product.PRODUCT_TYPE;
    return (
        <div className="product-item"> 
            <div className="product-image-placeholder" style={{ backgroundImage: `url(${image})`, backgroundSize:'cover'}}>
                <span className="product-type"  style={{ backgroundColor: productType === 'USED' ? 'blue' : 'red' }}>{productType == 'USED' ? '중고' : '경매'}</span>
                </div> {/* 회색 사진 박스 */}
            <div className="product-details">
                <div className="product-title text-16px">{productName}</div>
                <div className="product-price text-16px">{productPrice} 원</div>
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

const AllProductPresenter = ( { products }) => {

    // 인기 상품 및 최신 등록 상품 섹션을 위한 더미 데이터 배열
    // const products = Array(10).fill(null); // 5개 항목


    return (
        <div className="home-page-container">
            <div className="home-content-layout">                
                <main className="home-main-content">
                    <section className="product-section">
                        <h2 className="section-title text-46px">전체상품</h2>
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

export default AllProductPresenter;
