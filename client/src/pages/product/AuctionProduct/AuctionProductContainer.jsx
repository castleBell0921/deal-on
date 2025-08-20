
import FilterSidebar from '../../common/FilterSideBar';
import React, { useEffect, useState } from 'react';
import AuctionProductPresenter from './AuctionProductPresenter';
import useProductFilters from '../../../hooks/useProductFilters';
const AuctionProductContainer = () => {
    const {
        products,
        filters,
        handleFilterChange,
        handleResetFilters
    } = useProductFilters('http://localhost:4000/products/auctionProducts');

    // useEffect(() => {
    //     const fetchProducts = async  () => {
    //         try {
    //             const response = await fetch('http://localhost:4000/products/auctionProducts');
    //             console.log(response);
    //             if(!response.ok) {
    //                 throw new Error(`HTTP error! status: ${response.status}`);
    //             }
    //             const data = await response.json();

    //             setProducts(data);

                
    //         } catch(err) {
    //             console.error('상품 조회 오류 : ', err);
    //         }
    //     };

    //     fetchProducts();
    // }, []);

    const [ filterCategory, setFilterCategory] = useState([]);
    
    useEffect(()=> {
        const fetchCategories = async()=> {
            try {
                const response = await fetch('http://localhost:4000/products/auctionProductsCategory');
                if(!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();

                if(Array.isArray(data)) {
                    setFilterCategory(data);
                    console.log('data : ' + data);
                } else {
                    console.warn('카테고리 API 응답이 배열이 아닙니다.' , data);
                }
            }catch(err) {
                console.error('카테고리 목록 조회 오류 : ' , err);
            }
        };

        fetchCategories();
    }, []); 
    return (
        <div className="all-product-container">
            <FilterSidebar
                selectedFilters={filters}
                onFilterChange={handleFilterChange}
                onResetFilters={handleResetFilters}
                filterCategory = { filterCategory}
            />
            <AuctionProductPresenter 
                products = { products }
            />
        </div>
    );
}

export default AuctionProductContainer;