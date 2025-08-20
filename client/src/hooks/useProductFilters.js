import { useState, useEffect, useCallback } from 'react';

const useProductFilters =  (apiEndpoint ) => {
    const [ products, setProducts ] = useState([]);

    const [filters, setFilters ] = useState({
        location: '',
        category: '',
        showOnlyAvailable: false
    });

    const handleFilterChange = useCallback((filterName, value) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [filterName]: value
        }));
    }, []);

    const handleResetFilters = useCallback(() => {
        setFilters({
            location: '',
            category: '',
            showOnlyAvailable: false
        });
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            try{
                const queryParams = new URLSearchParams();
                if(filters.location) {
                    queryParams.append('location', filters.location);
                }
                if(filters.category) {
                    queryParams.append('category', filters.category);
                }
                if(filters.showOnlyAvailable) {
                    queryParams.append('available', 'true');
                }

                const url = `${apiEndpoint}?${queryParams.toString()}`;

                console.log('Fetching URL : ', url);


                const response = await fetch(url);

                if(!response.ok){ 
                    throw new Error(`HTTP Error! status: ${response.status}`);
                }
                const data = await response.json();

                if(Array.isArray(data)) {
                    setProducts(data);
                } else {
                    setProducts([]);
                    console.warn('API 응답이 배열이 아닙니다. 받은 데이터 : ' , data);
                }
            } catch(err){
                console.error('상품 조회 오류: ', err);
                setProducts([]);
            }
        };

        fetchProducts();
    }, [filters, apiEndpoint]);

    return {
        products,
        filters,
        handleFilterChange,
        handleResetFilters
    };
};

export default useProductFilters;