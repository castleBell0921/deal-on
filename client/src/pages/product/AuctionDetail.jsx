export default function AuctionDetail() {
    // 실제 데이터는 props나 API 호출로
    const auction = {
      categoryPath: "홈 > 중고거래 > 디지털기기", // 예시, 실제로는 동적으로 생성
      image: "path/to/your/image.jpg", // 실제 이미지 경로 또는 플레이스홀더
      title: "상태 좋은 라탄 TV 거실장",
      location: "서울특별시 용산구 이태원동",
      startPrice: "100,000",
      currentPrice:"142,000",
      endDate: "2025-04-25 18:00",
      description: `나이키 코리아 드로우 당첨제품.
      모든 구성품 다 있어요.`,
      timeAgo: 2,
      views: 24,
      chatCount: 3,
      likeCount: 8,
      seller: {
        name: "forqls",
        avatar: "path/to/avatar.jpg", // 예시 아바타 경로 
        trustGauge: "Trust Gauge 92%" // 예시 데이터
      },
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3164.019311884898!2d126.99005291518744!3d37.53005997980517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca2f5a307d73b%3A0xe7c5a38f196a30d9!2z7JWI7Yqo7JuMIOywveySiSDEs77tjqXroZwg7ZWc7JuM6rSA!5e0!3m2!1sko!2skr!4v1620780908102!5m2!1sko!2skr" // 예시 URL
    };
  
    return (
      <main className="product-main-content">
        <div className="breadcrumb text-13px">{auction.categoryPath}</div>
        <div className="product-info-container">
          <section className="product-image-section">
            {/* 실제로는 이미지 컴포넌트나 라이브러리 사용 */}
            <div className="product-image-placeholder">
              상품 이미지
              {/* <img src={auction.image} alt={auction.title} style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px'}} /> */}
            </div>
            <div className="product-seller-info">
              <div className="seller-avatar-placeholder">
                {/* <img src={auction.seller.avatar} alt={auction.seller.name} style={{width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover'}} /> */}
              </div>
              <div className="seller-name text-15px">{auction.seller.name}</div>
              <div className="seller-trust-gauge text-13px">{auction.seller.trustGauge}</div>
            </div>
          </section>
          <section className="product-details-section">
            <div className="product-location text-18px">{auction.location}</div>
            <h1 className="product-title text-24px">{auction.title}</h1>
            <div className="product-meta-info">{auction.timeAgo}시간 전·조회 {auction.views}·채팅 {auction.chatCount}·찜 {auction.likeCount}</div>
            <div className="product-description text-15px">
              {auction.description}
            </div>
            <div className="auction-container">
                <div className="price-display-area">
                    <div className="price-row">
                        <span className="text-16px">경매 시작가:</span>
                        <span className="price-value text-24px">{auction.startPrice}</span>
                    </div>

                    <div className="price-row">
                        <span>현재 입찰가:</span>
                        <span className="text-24px current-bid">{auction.currentPrice}</span>
                    </div>

                    <hr className="separator" />


                    <div className="price-row">
                        <span>경매 마감</span>
                        <span className="end-date text-20px">{auction.endDate}</span>
                    </div>
                </div>

                <div className="bid-input-area">
                    <label htmlFor="bidAmountInput" className="bid-input-label">
                    입찰 금액:
                    </label>
                    <input
                    id="bidAmountInput"
                    type="text"
                    placeholder=""
                    className="bid-input" 
                    />
                </div>

                <div className="buttons-area">
                    <button className="bid-button"> 입찰 하기 </button>
                    <button className="contact-button"> 판매자와 대화하기 </button>
                </div>
            </div>
          </section>
        </div>
  
        <div className="trade-location-title text-20px">거래 희망 장소</div>
        <div className="product-map-container">
          <iframe
            src={auction.mapUrl}
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