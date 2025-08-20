export default function ProductDetail() {
  // 실제 데이터는 props나 API 호출로
  const product = {
    categoryPath: "홈 > 중고거래 > 디지털기기", // 예시, 실제로는 동적으로 생성
    image: "path/to/your/image.jpg", // 실제 이미지 경로 또는 플레이스홀더
    title: "상태 좋은 라탄 TV 거실장",
    location: "서울특별시 용산구 이태원동",
    price: "80,000",
    description: `안녕하세요 ! 반년정도 사용한 거실 TV장 판매합니다.

사용 기간이 짧아 전체적으로 상태 매우 좋습니다.
구매 당시 가격은 37만원 이었고, 튼튼하고 깔끔한 제품이에요.

4월 28일 이사로 인해 정리중이며,
판매가 안 될 경우 지인에게 넘길 예정입니다.

28일 오전 9시쯤 방문 가능하시면
직접 아래까지 내려드릴 수 있어요 :D

필요하신 분께 잘 전달 되었으면 좋겠어요.
편하게 연락주세요! 감사합니다 !`,
    timeAgo: 2,
    views: 24,
    chatCount: 3,
    likeCount: 8,
    seller: {
      name: "forqls",
      avatar: "path/to/avatar.jpg", // 실제 아바타 경로 또는 플레이스홀더
      trustGauge: "Trust Gauge 92%" // 예시 데이터
    },
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3164.019311884898!2d126.99005291518744!3d37.53005997980517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca2f5a307d73b%3A0xe7c5a38f196a30d9!2z7JWI7Yqo7JuMIOywveySiSDEs77tjqXroZwg7ZWc7JuM6rSA!5e0!3m2!1sko!2skr!4v1620780908102!5m2!1sko!2skr" // 예시 URL
  };

  return (
    <main className="product-main-content">
      <div className="breadcrumb text-13px">{product.categoryPath}</div>
      <div className="product-info-container">
        <section className="product-image-section">
          {/* 실제로는 이미지 컴포넌트나 라이브러리 사용 */}
          <div className="product-image-placeholder">
            상품 이미지
            {/* <img src={product.image} alt={product.title} style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px'}} /> */}
          </div>
          <div className="product-seller-info">
            <div className="seller-avatar-placeholder">
              {/* <img src={product.seller.avatar} alt={product.seller.name} style={{width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover'}} /> */}
            </div>
            <div className="seller-name text-15px">{product.seller.name}</div>
            <div className="seller-trust-gauge text-13px">{product.seller.trustGauge}</div>
          </div>
        </section>
        <section className="product-details-section">
          <div className="product-location text-18px">{product.location}</div>
          <h1 className="product-title text-24px">{product.title}</h1>
          <div className="product-meta-info">{product.timeAgo}시간 전·조회 {product.views}·채팅 {product.chatCount}·찜 {product.likeCount}</div>
          <div className="product-price text-28px">{product.price} 원</div>
          <div className="product-description text-15px">
            {product.description}
          </div>
          
          <button className="chat-button text-16px">판매자에게 채팅하기</button>
        </section>
      </div>

      <div className="trade-location-title text-20px">거래 희망 장소</div>
      <div className="product-map-container">
        <iframe
          src={product.mapUrl}
          width="100%"
          height="100%"
          style={{ border: 0, borderRadius: '8px' }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </main>
  );
}