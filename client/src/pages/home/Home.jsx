// import { useNavigate } from 'react-router-dom';
// import Topbar from '../common/Topbar';
// import Header from '../common/Header';
// import SearchBar from '../common/SearchBar';
// import RecentViewed from '../common/RecentViewed';
// import '../../styles/Home.css';

// // 임시 상품 아이템 컴포넌트 더미
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

// const Home = () => {
//     const navigate = useNavigate(); // 필요 없으면 나중에 제거

//     // 인기 상품 및 최신 등록 상품 섹션을 위한 더미 데이터 배열
//     const popularItems = Array(5).fill(null); // 5개 항목
//     const recentItems = Array(5).fill(null); // 5개 항목


//     return (
//         <div className="home-page-container">
//             <Header />
//             <SearchBar />
//             {/* RecentViewed를 포함하는 전체 레이아웃 */}
//             <div className="home-content-layout">
//                 {/* 본문 내용 영역 */}
//                 <main className="home-main-content">
//                     {/* 인기 상품 섹션 */}
//                     <section className="product-section">
//                         <h2 className="section-title text-46px">인기 상품</h2>
//                         <div className="product-list">
//                             {popularItems.map((_, index) => (
//                                 <DummyProductItem key={`popular-${index}`} />
//                             ))}
//                         </div>
//                         <button className="more-button text-16px">더보기</button>
//                     </section>

//                     {/* 최신 등록 상품 섹션 */}
//                     <section className="product-section">
//                         <h2 className="section-title text-46px">최신 등록 상품</h2>
//                         <div className="product-list">
//                             {recentItems.map((_, index) => (
//                                 <DummyProductItem key={`recent-${index}`} />
//                             ))}
//                         </div>
//                         <button className="more-button text-16px">더보기</button>
//                     </section>

//                 </main>
//                 <RecentViewed />
//             </div>
//         </div>
//     );
// }

// export default Home;
