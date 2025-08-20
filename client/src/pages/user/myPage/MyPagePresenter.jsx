import Header from '../../common/Header';
import SearchBar from '../../common/SearchBar';
import '../../../styles/MyPage.css'; // 스타일 시트 임포트

const MyPagePresenter = () => {
    return (
        <div>
            <aside class="mypage-sidebar">
                <h2 class="sidebar-title">마이 페이지</h2>

                <nav class="sidebar-nav">
                    <ul class="nav-menu">
                        <li class="nav-item">
                            <a href="#" class="nav-link active">거래 정보</a>
                            <ul class="sub-menu">
                                <li class="sub-item"><a href="#" class="sub-link">판매내역</a></li>
                                <li class="sub-item"><a href="#" class="sub-link">구매내역</a></li>
                                <li class="sub-item"><a href="#" class="sub-link">찜한상품</a></li>
                            </ul>
                        </li>
                        <li class="nav-item">
                            <a href="#" class="nav-link">내 정보</a>
                            <ul class="sub-menu">
                                <li class="sub-item"><a href="#" class="sub-link">내 정보 수정</a></li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </aside>
        </div>
    );
}

export default MyPagePresenter;