import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './ImageGalleryModal.css';

const ImageGalleryModal = ({
  isOpen,
  onClose,
  images,
  projectName,
  currentIndex = 0,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(currentIndex);

  useEffect(() => {
    if (isOpen) {
      setCurrentImageIndex(currentIndex);
    }
  }, [isOpen, currentIndex]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const goToPrevious = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  return createPortal(
    <div className="image-gallery-modal-overlay" onClick={onClose}>
      <div className="image-gallery-modal" onClick={(e) => e.stopPropagation()}>
        {/* Botón cerrar */}
        <button className="modal-close-btn" onClick={onClose}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Imagen */}
        <div className="modal-image-container">
          <img
            src={images[currentImageIndex]}
            alt={`${projectName} - Imagen ${currentImageIndex + 1}`}
            className="modal-image"
          />

          {images.length > 1 && (
            <>
              <button className="modal-nav-btn modal-nav-prev" onClick={goToPrevious}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15,18 9,12 15,6"></polyline>
                </svg>
              </button>
              <button className="modal-nav-btn modal-nav-next" onClick={goToNext}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9,18 15,12 9,6"></polyline>
                </svg>
              </button>
            </>
          )}
        </div>

        {/* Indicadores */}
        {images.length > 1 && (
          <div className="modal-indicators">
            {images.map((_, index) => (
              <button
                key={index}
                className={`modal-indicator ${index === currentImageIndex ? 'active' : ''}`}
                onClick={() => goToImage(index)}
              />
            ))}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

export default ImageGalleryModal;
