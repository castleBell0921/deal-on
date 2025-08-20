export default function RecentViewed() {
  return (
    <aside className="recent-viewed-container">
      <div className="recent-viewed-box">
        <h2 className="recent-viewed-title text-20px">최근 본 상품</h2>
        <div className="recent-viewed-items">
          {[1, 2, 3, 4].map(n => ( // 이미지 4개로 보이도록 
            <div key={n} className="recent-item-placeholder" />
          ))}
        </div>
        <button className="recent-viewed-more-button text-12px">더 보러가기</button>
        </div>
    </aside>
  );
}