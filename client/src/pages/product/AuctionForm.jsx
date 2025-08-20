import Topbar from '../common/Topbar.jsx'; 
import SearchBar from '../common/SearchBar.jsx'; 
import '../../styles/ProductForm.css'; 

export default function AuctionForm() {
  return (
    
    <div className="new-product-page-container">
      <Topbar />
      <SearchBar />
      <h1 className="page-title text-36px">상품 정보</h1> 
      <div className="new-product-main-content">

        {/* 사진 추가 섹션 */}
        <section className="photo-upload-section">
          <div className="photo-placeholder text-14px">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="photo-icon">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15.5a2.25 2.25 0 0 0 2.25-2.25V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055m-7.005 1.442a2.25 2.25 0 1 1-3.182 3.182M9.75 19.5A3.75 3.75 0 0 0 13.5 15.75h2.25a3.75 3.0 0 0 0 3.75-3.75V9.47c0-.252-.023-.5-.068-.745S16.921 7.5 16.77 7.35c-.719-.719-1.608-1.284-2.576-1.635a48.424 48.424 0 0 0-1.123-.234c-.224-.045-.447-.08-.67-.112A2.31 2.31 0 0 1 8.25 6.175z" />
            </svg>
            0/10 {/* 선택된 사진 수 표시 */}
          </div>
        </section>

        <section className="input-section">
          <div className="section-title text-24px">제목</div> 
          <input type="text" className="input-field text-20px" placeholder=" 제목" />
        </section>

        <section className="input-section">
          <div className="section-title text-24px">카테고리</div> 
          {/* 대충 대체, 모달 구현 ㅎㅏ고 바꾸기*/}
          <div className="input-field select-field text-20px">
             카테고리 선택
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="select-arrow">
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </div>
        </section>

        {/* 시작 단가 */}
        <section className="input-section">
          <div className="section-title text-24px">시작 단가</div> 
          <div className="input-field price-input-wrapper">
             <span className="price-unit text-20px">₩</span>
             <input type="text" className="price-input-field text-20px" placeholder=" 판매가격" />
          </div>
        </section>

        {/* 경매 기간 */}
        <section className="input-section">
          <div className="section-title text-24px">경매 기간</div> 
          <div className="auction-period-inputs">
            <input type="text" className="auction-input-field text-20px" placeholder=" 시작 일시" />
            <input type="text" className="auction-input-field text-20px" placeholder=" 종료 일시" />
          </div>
        </section>

        {/* 자세한 설명 */}
        <section className="input-section">
          <div className="section-title text-24px">자세한 설명</div> 
          <textarea className="input-field textarea-field text-20px" placeholder={` 이태원동에 게시될 게시글, 모델명, 구매시기, 하자 유무 등
 상품 설명을 최대한 자세히 적어주세요.
 (판매금지 물품은 게시가 제한될 수 있어요.)

 안전한 거래환경을 위해 과학기술정보통신부, 한국 인터넷진흥원과 함께 해요.`}></textarea>
        </section>

        {/* 거래 희망 장소 */}
         <section className="input-section">
          <div className="section-title text-24px">거래 희망 장소</div> 
          {/* 대충 input 태그로 대체, 모달 구현 시 바꾸기*/}
           <div className="input-field select-field text-20px">
             장소 선택
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="select-arrow">
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </div>
          <label className="checkbox-label text-16px">
             <input type="checkbox" className="checkbox" /> 택배 거래
          </label>
        </section>

        {/* 등록 버튼 */}
        <button className="submit-button text-20px">등록 하기</button>

      </div>
    </div>
  );
}