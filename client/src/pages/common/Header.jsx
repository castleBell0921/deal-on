// Header.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import LoginModal from '../user/login/LoginModalContainer';
import '../../styles/common.css'; // 스타일 시트 임포트 (여기에 드롭다운 CSS도 추가할 것)

const Header = ({onCategorySelect }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isTooltipVisible, setTooltipVisible] = useState(false); // 이 변수는 드롭다운과는 무관하니, 툴팁에 쓰실 게 아니라면 삭제 고려
  const [ category, setCategory ] = useState('카테고리');

  // 1. 카테고리 드롭다운 표시 여부 상태 추가
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  const checkLoginStatus = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/checkLogin', {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setIsLoggedIn(data.isLoggedIn);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error('로그인 상태 확인 오류:', error);
      setIsLoggedIn(false);
    }
  };

  // 툴팁 관련 핸들러 (드롭다운과 분리)
  const handleMouseEnter = () => {
    setTooltipVisible(true);
  };
  const handleMouseLeave = () => {
    setTooltipVisible(false);
  };

  // 2. 드롭다운 이벤트 핸들러
  const handleMouseEnterCategory = () => {
    setIsCategoryDropdownOpen(true);
  };

  const handleMouseLeaveCategory = () => {
    setIsCategoryDropdownOpen(false);
  };

 const handleDropdownItemClick = (categoryPath) => { // categoryType 대신 categoryPath 사용
    console.log(`${categoryPath} 카테고리 선택됨!`);
    setIsCategoryDropdownOpen(false); // 드롭다운 닫기

    // [핵심 수정] 각 카테고리 페이지의 실제 경로로 이동
    switch (categoryPath) {
        case 'all':
            setCategory('전체상품');
            navigate('/products/allProduct'); // AllProductContainer가 렌더링될 경로
            break;
        case 'used':
            navigate('/products/normalProduct'); // NormalProductContainer가 렌더링될 경로
            setCategory('중고상품');
            break;
        case 'auction':
            navigate('/products/auctionProduct'); // AuctionProductContainer가 렌더링될 경로
            setCategory('경매상품');
            break;
        default:
            navigate('/'); // 기본 경로 (홈)
            break;
    }
  };

  

  useEffect(() => {
    checkLoginStatus(); // 컴포넌트 마운트 시 로그인 상태 확인

    const loginSuccess = searchParams.get('loginSuccess');
    if (loginSuccess === 'true') {
      alert('로그인 완료되었습니다.');
      checkLoginStatus(); // 카카오 로그인 후에도 상태 업데이트
      navigate(window.location.pathname, { replace: true });
    }
  }, [searchParams, navigate]);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/logout', {
        method: 'post',
        credentials: 'include',
      });

      if (response.ok) {
        alert('로그아웃되었습니다.');
        setIsLoggedIn(false);
        navigate('/');
      } else {
        console.error('로그아웃 실패');
      }
    } catch (error) {
      console.error('로그아웃 요청 오류: ', error);
    }
  };

  const handleHome = () => {
    setCategory('카테고리');
    navigate('/');
  };

  const handleMyPage = () => {
    navigate('/myPage');
  };

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  return (
    // 전체 헤더를 감싸는 div (필요에 따라 semantic tag로 변경 가능: <header>)
    <div className="signIn">
      {/* 로고와 카테고리 묶음 (좌측 영역) */}
      <div className="left-header-section">
        {/* 로고 버튼 */}
        <button className="logoButton" onClick={handleHome}>
          {/* 이미지 로딩 방식에 따라 여기에 텍스트 숨김 처리 필요 */}
        </button>

        {/* 3. 카테고리 드롭다운 컨테이너 */}
        <div className="category-container"
             onMouseEnter={handleMouseEnterCategory} // 마우스 진입 이벤트
             onMouseLeave={handleMouseLeaveCategory}> {/* 마우스 이탈 이벤트 */}
          <span className="category-text">{category}</span> {/* 기존 "카테고리" 텍스트 */}

          {/* 4. 드롭다운 메뉴 (isCategoryDropdownOpen 상태에 따라 렌더링) */}
          {isCategoryDropdownOpen && (
            <div className="category-dropdown">
              <div className="dropdown-item" onClick={() => handleDropdownItemClick('all')}>전체 상품</div>
              <div className="dropdown-item" onClick={() => handleDropdownItemClick('used')}>중고 상품</div>
              <div className="dropdown-item" onClick={() => handleDropdownItemClick('auction')}>경매 상품</div>
              {/* 필요한 경우 다른 카테고리 항목 추가 */}
            </div>
          )}
        </div> {/* .category-container 끝 */}
      </div> {/* .left-header-section 끝 */}

      {/* 로그인/회원가입/마이페이지/로그아웃 묶음 (우측 영역) */}
      <span className="join">
        {isLoggedIn ? (
          <div className="loginHeader">
            <p>채팅하기</p>
            <p>판매하기</p>
            <p onClick={handleMyPage}>마이페이지</p>
            <p onClick={handleLogout}>로그아웃</p>
          </div>
        ) : (
          <p onClick={openLoginModal}>로그인 | 회원가입</p>
        )}
      </span>

      {/* 로그인 모달 */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onRequestClose={closeLoginModal}
        onLoginSuccess={handleLoginSuccess}
        isLoggedIn={isLoggedIn}
        checkLoginStatus={checkLoginStatus}
      />
    </div>
  );
};

export default Header;