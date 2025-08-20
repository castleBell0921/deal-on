import React, { useState, useEffect } from 'react';
import Header from '../common/Header'
import HomePresenter from './HomePresenter';
import SearchBar from '../common/SearchBar';

const HomeContainer = () => {
    const [currentTradeType, setCurrentTradeType] = useState('all'); // 초기값: 'used' 또는 'all' (기본 보여줄 상품 타입)
    const [isDefaultView, setIsDefaultView] = useState(true); // 인기/최신 상품 뷰 여부


    const [products, setProducts] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(true);
    const [errorProducts, setErrorProducts] = useState(null);

    // 상품 데이터를 가져오는 비동기 함수
    const fetchProducts = async () => {
        setLoadingProducts(true);
        setErrorProducts(null);
        let url = '';

        try {
            // currentTradeType과 isDefaultView 상태에 따라 URL 결정
            if (currentTradeType === 'all') {
                url = 'http://localhost:4000/products/allProducts'; // 모든 종류의 상품을 가져오는 API
                // 백엔드에서 모든 상품을 가져오는 엔드포인트가 'all-products'라고 가정
                // 이 API가 인기/최신 상품도 포함해서 주거나, 별도 로직으로 인기/최신 분리
            } else if (currentTradeType === 'used') {
                if (isDefaultView) {
                    url = 'http://localhost:4000/products/used-products/default-view'; // 중고상품의 인기/최신
                } else {
                    url = 'http://localhost:4000/products/used-products/all'; // 중고상품 전체
                }
            } else if (currentTradeType === 'auction') {
                if (isDefaultView) {
                    url = 'http://localhost:4000/products/auction-products/default-view'; // 경매상품의 인기/최신
                } else {
                    url = 'http://localhost:4000/products/auction-products/all'; // 경매상품 전체
                }
            } else {
                // 정의되지 않은 카테고리일 경우 기본값 또는 에러 처리
                console.warn(`알 수 없는 카테고리 타입: ${currentTradeType}`);
                setProducts([]);
                setLoadingProducts(false);
                return;
            }

            if (!url) {
                console.warn('No URL determined for product fetch.');
                setProducts([]);
                setLoadingProducts(false);
                return;
            }

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setProducts(data);
        } catch (err) {
            console.error('상품 데이터 로드 실패:', err);
            setErrorProducts('상품을 불러오는 데 실패했습니다.');
            setProducts([]);
        } finally {
            setLoadingProducts(false);
        }
    };

    // currentTradeType 또는 isDefaultView 변경 시 상품 데이터 다시 가져오기
    useEffect(() => {
        fetchProducts();
    }, [currentTradeType, isDefaultView]);

    // Header에서 카테고리 선택 시 호출될 함수
    const handleCategorySelect = (selectedType) => {
        setCurrentTradeType(selectedType); // 선택된 카테고리로 currentTradeType 업데이트

        // 선택된 카테고리에 따라 isDefaultView를 조정
        // 'all' (전체 상품)을 선택하면 인기/최신 뷰로 돌아가거나, 아니면 전체 리스트 뷰를 유지할지 결정
        if (selectedType === 'all') {
            setIsDefaultView(true); // '전체 상품' 선택 시 기본(인기/최신) 뷰로 설정 (기획에 따라 변경 가능)
        } else {
            setIsDefaultView(false); // '중고'나 '경매' 선택 시 전체 리스트 뷰로 설정
        }
    };

    return (
        <div>
            <HomePresenter
                currentTradeType={currentTradeType}
                onSelectTradeType={handleCategorySelect} // SearchBar에도 동일한 함수 전달 (선택된 타입을 currentTradeType으로 설정)
                products={products}
                loadingProducts={loadingProducts}
                errorProducts={errorProducts}
            />
        </div>
    )
}

export default HomeContainer;