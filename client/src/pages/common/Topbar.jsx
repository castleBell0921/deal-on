export default function Topbar() {
  return (
    <div className="topbar-container text-20px">
      <div className="topbar-category">카테고리</div>
      <div className="topbar-actions">
        <button>채팅하기</button>
        <button>판매하기</button>
        <button>마이페이지</button>
        <button>로그아웃</button>
      </div>
    </div>
  );
}