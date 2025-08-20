import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Modal from 'react-modal';
import './styles/index.css'
import './styles/font.css';
import './styles/common.css';
import App from './App.jsx';
import './App.css';

Modal.setAppElement('#root'); // 접근성 설정을 위해 필요 (보통 index.js에 설정)

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
    </StrictMode>,
)
