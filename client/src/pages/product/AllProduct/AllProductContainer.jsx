import React, { useEffect, useState } from 'react';
import useProductFilters from '../../../hooks/useProductFilters'; // Custom Hook 임포트 경로 확인
import AllProduct from './AllProductPresenter.jsx';
import FilterSidebar from "../../common/FilterSideBar.jsx";
import '../../../styles/productDetail.css';



const AllProductContainer = () => {

    const {
            products,
            filters,
            handleFilterChange,
            handleResetFilters
        } = useProductFilters('http://localhost:4000/products/allProducts');

    // const [products, setProducts] = useState([]);
    const [ filterCategory, setFilterCategory ] = useState([]);
    // useEffect(() => {
    //     const fetchProducts = async  () => {
    //         try {
    //             const response = await fetch('http://localhost:4000/products/allProducts');
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
    
    useEffect(() => {
        const fetchCategories = async () => {
            try{
                const response = await fetch('http://localhost:4000/products/allProductsCategory');
                if(!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();

                if(Array.isArray(data)) {
                    setFilterCategory(data);
                    console.log('data : ' + data);
                } else {
                    console.warn('카테고리 API 응답이 배열이 아닙니다.', data);
                }
            } catch(err) {
                console.error('카테고리 목록 조회 오류:', err);
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
                filterCategory={filterCategory}
            />
            <AllProduct 
                products = { products }
                
            />
        </div>
    );
}

export default AllProductContainer;