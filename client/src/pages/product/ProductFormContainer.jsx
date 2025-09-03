import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductFormPresenter from './ProductFormPresenter';

export default function ProductFormContainer() {
    const navigate = useNavigate();
    const [formState, setFormState] = useState({
        title: '',
        category: '',
        price: '',
        priceSuggestion: false,
        description: '',
        location: '',
        images: [],
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormState(prevState => ({ ...prevState, [name]: value }));
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setFormState(prevState => ({ ...prevState, [name]: checked }));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (formState.images.length + files.length > 10) {
            alert('이미지는 최대 10개까지 업로드할 수 있습니다.');
            return;
        }
        setFormState(prevState => ({ ...prevState, images: [...prevState.images, ...files] }));
    };

    // --- 이미지 삭제 함수 추가 ---
    const handleRemoveImage = (indexToRemove) => {
        setFormState(prevState => ({
            ...prevState,
            images: prevState.images.filter((_, index) => index !== indexToRemove)
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Submitted:', formState);
    };

    return (
        <ProductFormPresenter
            formState={formState}
            handleInputChange={handleInputChange}
            handleCheckboxChange={handleCheckboxChange}
            handleImageChange={handleImageChange}
            handleRemoveImage={handleRemoveImage} // 삭제 함수 전달
            handleSubmit={handleSubmit}
        />
    );
}