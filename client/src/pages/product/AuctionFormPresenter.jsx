import React from 'react';
import '../../styles/ProductForm.css';

export default function AuctionFormPresenter({
                                                 formState,
                                                 handleInputChange,
                                                 handleCheckboxChange,
                                                 handleImageChange,
                                                 handleRemoveImage,
                                                 handleSubmit
                                             }) {
    const placeholderText = `이태원동에 게시될 게시글, 모델명, 구매시기, 하자 유무 등\n상품 설명을 최대한 자세히 적어주세요.\n(판매금지 물품은 게시가 제한될 수 있어요.)\n\n안전한 거래환경을 위해 과학기술정보통신부, 한국 인터넷진흥원과 함께 해요.`;

    return (
        <div className="new-product-page-container">
            <h1 className="page-title text-36px">경매 상품 정보</h1>
            <div className="new-product-main-content">
                <form onSubmit={handleSubmit}>
                    <section className="photo-upload-section">
                        {/* --- 이 부분을 수정 --- */}
                        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                            {/* 1. 사진 업로드 버튼 */}
                            <label htmlFor="auction-photo-upload" className="photo-placeholder text-14px" style={{cursor: 'pointer', flexShrink: 0}}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="photo-icon">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15.5a2.25 2.25 0 0 0 2.25-2.25V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055m-7.005 1.442a2.25 2.25 0 1 1-3.182 3.182M9.75 19.5A3.75 3.75 0 0 0 13.5 15.75h2.25a3.75 3.0 0 0 0 3.75-3.75V9.47c0-.252-.023-.5-.068-.745S16.921 7.5 16.77 7.35c-.719-.719-1.608-1.284-2.576-1.635a48.424 48.424 0 0 0-1.123-.234c-.224-.045-.447-.08-.67-.112A2.31 2.31 0 0 1 8.25 6.175z" />
                                </svg>
                                {formState.images.length}/10
                            </label>

                            {/* 2. 이미지 미리보기 */}
                            {formState.images.map((image, index) => (
                                <div key={index} style={{ position: 'relative', width: '150px', height: '150px' }}>
                                    <img src={URL.createObjectURL(image)} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
                                    <button type="button" onClick={() => handleRemoveImage(index)} style={{ position: 'absolute', top: '5px', right: '5px', background: 'rgba(0,0,0,0.5)', color: 'white', border: 'none', borderRadius: '50%', width: '20px', height: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>
                                        X
                                    </button>
                                </div>
                            ))}
                        </div>
                        {/* 숨겨진 실제 input 태그 */}
                        <input type="file" id="auction-photo-upload" multiple onChange={handleImageChange} accept="image/*" style={{display: 'none'}} />
                    </section>

                    {/* ... 나머지 폼 ... */}
                    <section className="input-section">
                        <div className="section-title text-24px">제목</div>
                        <input name="title" value={formState.title} onChange={handleInputChange} type="text" className="input-field text-20px" placeholder=" 제목" />
                    </section>
                    <section className="input-section">
                        <div className="section-title text-24px">카테고리</div>
                        <div className="input-field select-field text-20px">카테고리 선택</div>
                    </section>
                    <section className="input-section">
                        <div className="section-title text-24px">시작 단가</div>
                        <div className="input-field price-input-wrapper">
                            <span className="price-unit text-20px">₩</span>
                            <input name="startPrice" value={formState.startPrice} onChange={handleInputChange} type="text" className="price-input-field text-20px" placeholder=" 시작 단가" />
                        </div>
                    </section>
                    <section className="input-section">
                        <div className="section-title text-24px">경매 기간</div>
                        <div className="auction-period-inputs">
                            <input name="auctionStartDate" value={formState.auctionStartDate} onChange={handleInputChange} type="datetime-local" className="auction-input-field text-20px" />
                            <input name="auctionEndDate" value={formState.auctionEndDate} onChange={handleInputChange} type="datetime-local" className="auction-input-field text-20px" />
                        </div>
                    </section>
                    <section className="input-section">
                        <div className="section-title text-24px">자세한 설명</div>
                        <textarea name="description" value={formState.description} onChange={handleInputChange} className="input-field textarea-field text-20px" placeholder={placeholderText}></textarea>
                    </section>
                    <section className="input-section">
                        <div className="section-title text-24px">거래 희망 장소</div>
                        <div className="input-field select-field text-20px">장소 선택</div>
                        <label className="checkbox-label text-16px">
                            <input name="allowShipping" checked={formState.allowShipping} onChange={handleCheckboxChange} type="checkbox" className="checkbox" /> 택배 거래
                        </label>
                    </section>
                    <button type="submit" className="submit-button text-20px">등록 하기</button>
                </form>
            </div>
        </div>
    );
}