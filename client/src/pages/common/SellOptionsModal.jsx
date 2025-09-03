import React from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';

import '../../styles/font.css';

const SellOptionsModal = ({ isOpen, onRequestClose }) => {
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        onRequestClose(); // 모달 닫기
        navigate(path);   // 경로 이동
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className="sell-modal-content"
            overlayClassName="sell-modal-overlay"
            contentLabel="판매 방식 선택"
        >
            <button onClick={onRequestClose} className="sell-modal-close-btn">
                &times;
            </button>
            <h2 className="sell-modal-title font-size-20">
                <span style={{ color: '#673AB7' }}>판매 방식</span> 선택하기
            </h2>
            <div className="sell-modal-buttons">
                <button
                    className="sell-option-button font-size-16"
                    onClick={() => handleNavigate('/productForm')}
                >
                    일반 판매
                </button>
                <button
                    className="sell-option-button font-size-16"
                    onClick={() => handleNavigate('/auctionForm')}
                >
                    경매 판매
                </button>
            </div>
        </Modal>
    );
};

export default SellOptionsModal;
