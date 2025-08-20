import React, { useState, useEffect } from 'react'; 

export default function FilterSidebar( {
  filterCategory,
  selectedFilters,
  onFilterChange,
  onResetFilters

}) {
  // 각 필터 섹션별로 선택된 값을 관리하기 위한 상태 (예시)
  const [selectedLocation, setSelectedLocation] = useState('');
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState('');

  const locations = ['서울특별시 용산구', '이태원동', '한남동', '이촌동', '후암동', '한강로동', '이촌제1동', '효창동', '한강로3가'];

  const priceRanges = ['5,000원 이하', '10,000원 이하', '30,000원 이하'];
  
  // 더보기 버튼 상태
  const [showAllLocations, setShowAllLocations] = useState(false);
  const initialLocationCount = 5; // 초기에 보여줄 위치 항목 수


  useEffect(() => {
        if (filterCategory && Array.isArray(filterCategory)) {
            // availableCategories에서 NAME 속성만 추출하여 새 배열 생성
            const extractedCategoryNames = filterCategory
                .map(catItem => catItem.NAME) // { NAME: '의류' } -> '의류'
                .filter(name => name); // null 또는 undefined 이름 제거

            // 추출된 카테고리 이름을 알파벳 순으로 정렬 (선택 사항)
            extractedCategoryNames.sort(); 

            setCategory(extractedCategoryNames); // category 상태 업데이트
            // console.log("FilterSidebar: category 상태 업데이트됨", extractedCategoryNames); // 디버깅용
        }
    }, [filterCategory]); // availableCategories prop이 변경될 때마다 이 useEffect 실행

     const handleReset = () => {
        onResetFilters(); // 부모의 필터 초기화 함수 호출
    };
    
  return (
    <aside className="filter-sidebar-container">
      <div className="filter-section">
        <div className="filter-section-header">
          <h2 className="filter-title text-20px">필터</h2>
          <button className="filter-reset-button text-14px" onClick={handleReset}>초기화</button>
        </div>
        <label className="filter-checkbox-label text-18px">
          <input type="checkbox" className="filter-checkbox" /> 거래 가능만 보기
        </label>
      </div>

      <div className="filter-section">
        <h2 className="filter-title text-20px">위치</h2>
        <ul className="filter-list">
          {(showAllLocations ? locations : locations.slice(0, initialLocationCount)).map(loc => (
            <li key={loc} className="filter-list-item">
              <input
                type="radio"
                id={`loc-${loc}`}
                name="location"
                value={loc}
                checked={selectedLocation === loc}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="filter-radio"
              />
              <label htmlFor={`loc-${loc}`} className="filter-label text-18px">{loc}</label>
            </li>
          ))}
        </ul>
        {!showAllLocations && locations.length > initialLocationCount && (
          <button
            onClick={() => setShowAllLocations(true)}
            className="filter-more-button text-16px"
          >
            더보기
          </button>
        )}
      </div>

      <div className="filter-section">
        <h2 className="filter-title text-20px">카테고리</h2>
        <ul className="filter-list">
          {category.map(catName => (
            <li key={catName} className="filter-list-item">
              <input
                type="radio"
                id={`cat-${catName}`}
                name="category"
                value={catName}
                checked={selectedFilters.category === catName} 
                onChange={(e) => onFilterChange('category', e.target.value)}
                className="filter-radio"
              />
              <label htmlFor={`cat-${catName}`} className="filter-label text-18px">{catName}</label>
            </li>
          ))}
        </ul>
      </div>

      <div className="filter-section">
        <h2 className="filter-title text-20px">가격</h2>
        <ul className="filter-list">
          {priceRanges.map(range => (
            <li key={range} className="filter-list-item">
              <input
                type="radio"
                id={`price-${range}`}
                name="priceRange"
                value={range}
                checked={selectedPriceRange === range}
                onChange={(e) => setSelectedPriceRange(e.target.value)}
                className="filter-radio"
              />
              <label htmlFor={`price-${range}`} className="filter-label text-18px">{range}</label>
            </li>
          ))}
          <li className="filter-list-item price-input-item">
            <input type="text" placeholder="0" className="price-input text-16px" />
            <span className="text-16px price-input-separator">-</span>
            <input type="text" placeholder="0" className="price-input text-16px" />
            <br/>
            <button className="price-apply-button text-16px">적용</button>
          </li>
        </ul>
      </div>
    </aside>
  );
}