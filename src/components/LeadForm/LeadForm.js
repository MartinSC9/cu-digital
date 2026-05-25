import React, { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { useLanguage } from '../../contexts/LanguageContext';
import joaquinPhoto from '../../assets/joaquin-profile.jpg';
import cuLogo from '../../assets/logo-cu-new.png';
import './LeadForm.css';

const JOAQUIN_NUMBER = '5492804195492';

const SERVICE_OPTIONS = [
  { value: 'landing', labelKey: 'landing' },
  { value: 'webapp', labelKey: 'webapp' },
  { value: 'app', labelKey: 'app' },
  { value: 'redesign', labelKey: 'redesign' },
  { value: 'other', labelKey: 'other' },
];

export default function LeadForm({ onClose }) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    service: '',
    message: '',
  });

  const texts = t.leadForm;

  const handleSubmit = (e) => {
    e.preventDefault();

    const serviceName = formData.service
      ? texts.services[formData.service] || formData.service
      : '';

    const lines = [
      `Hola! Soy *${formData.name}*`,
      serviceName ? `Necesito: ${serviceName}` : '',
      formData.message ? `${formData.message}` : '',
      '',
      '(Enviado desde cudigital.com)',
    ].filter(Boolean);

    const message = lines.join('\n');
    const url = `https://wa.me/${JOAQUIN_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    onClose();
  };

  return (
    <div className="lead-form-container lead-form-modal">
      <div className="lead-form-overlay" onClick={onClose} />
      <div className="lead-form-card lead-form-card--modal">
        <button className="lead-form-close" onClick={onClose} aria-label="Cerrar">
          &times;
        </button>

        <div className="lead-form-layout">
          <div className="lead-form-content">
            <div className="lead-form-header">
              <h3 className="lead-form-title">{texts.title}</h3>
              <p className="lead-form-subtitle">{texts.subtitle}</p>
            </div>

            <form onSubmit={handleSubmit} className="lead-form">
              <div className="lead-form-field">
                <input
                  type="text"
                  placeholder={texts.namePlaceholder}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="lead-form-input"
                />
              </div>

              <div className="lead-form-field">
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="lead-form-input lead-form-select"
                  required
                >
                  <option value="">{texts.servicePlaceholder}</option>
                  {SERVICE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {texts.services[opt.labelKey]}
                    </option>
                  ))}
                </select>
              </div>

              <div className="lead-form-field">
                <textarea
                  placeholder={texts.messagePlaceholder}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="lead-form-input lead-form-textarea"
                  rows={3}
                />
              </div>

              <button
                type="submit"
                className="lead-form-submit lead-form-submit--whatsapp"
              >
                <FaWhatsapp style={{ fontSize: '1.2rem' }} />
                {texts.submit}
              </button>
            </form>

            <div className="lead-form-response-badge">
              <div className="lead-form-avatar-wrapper">
                <img src={joaquinPhoto} alt="Joaquín Urtasun" className="lead-form-avatar" />
                <span className="lead-form-avatar-dot" />
              </div>
              <span className="lead-form-response-text">{texts.responseTime}</span>
            </div>
          </div>

          <div className="lead-form-photo">
            <img src={cuLogo} alt="CU Digital" />
          </div>
        </div>
      </div>
    </div>
  );
}
