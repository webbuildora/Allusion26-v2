/*
 * ─── GOOGLE APPS SCRIPT ────────────────────────────────────────────
 * 1. Go to script.google.com and create a new project
 * 2. Paste the function below, replacing YOUR_SPREADSHEET_ID
 * 3. Deploy → New Deployment → Web App
 *    Execute as: Me | Who has access: Anyone
 * 4. Copy the Web App URL
 * 5. Paste it as the value of APPS_SCRIPT_URL below
 * ───────────────────────────────────────────────────────────────────
 *
 * function doPost(e) {
 *   const data = JSON.parse(e.postData.contents);
 *   const sheet = SpreadsheetApp
 *     .openById('YOUR_SPREADSHEET_ID')
 *     .getActiveSheet();
 *   sheet.appendRow([
 *     new Date(),
 *     data.participant1,
 *     data.participant2,
 *     data.institution,
 *     data.category,
 *     data.language,
 *     data.contact,
 *     data.email,
 *     data.message || ''
 *   ]);
 *   return ContentService
 *     .createTextOutput(JSON.stringify({ status: 'success' }))
 *     .setMimeType(ContentService.MimeType.JSON);
 * }
 */

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxNZaydtTvcVARRnAgxHAfq-esuyIWISaznG480c9s4nddJ8T8Rfr0XUI_Oo7RiQHp76Q/exec';

import React, { useState } from 'react';
import { FiEdit3, FiSend, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';

export default function Register() {
  const [formData, setFormData] = useState({
    participant1: '',
    participant2: '',
    institution: '',
    category: '', // 'University' or 'School'
    language: '',   // 'Sinhala', 'English', 'Tamil'
    contact: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('idle'); // 'idle', 'success', 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.participant1.trim()) newErrors.participant1 = 'Participant 1 Name is required';
    if (!formData.participant2.trim()) newErrors.participant2 = 'Participant 2 Name is required';
    if (!formData.institution.trim()) newErrors.institution = 'University / School name is required';
    if (!formData.category) newErrors.category = 'Category selection is required';
    if (!formData.language) newErrors.language = 'Language track selection is required';
    if (!formData.contact.trim()) newErrors.contact = 'Contact number is required';

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify(formData),
    })
      .then(() => {
        setSubmitStatus('success');
      })
      .catch(() => {
        setSubmitStatus('error');
        setErrorMessage('Failed to connect to server. Please try again.');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  if (submitStatus === 'success') {
    return (
      <section id="register">
        <div className="section-inner">
          <div className="success-card">
            <div className="success-icon">
              <FiCheckCircle />
            </div>
            <h3>Registration Received!</h3>
            <p>We'll be in touch soon. See you on stage!</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="register">
      <div className="section-inner">
        <div className="section-header">
          <span className="section-eyebrow">Join the Competition</span>
          <h2 className="section-title" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8rem', justifyContent: 'center' }}>
            Register for Allusion'26 <FiEdit3 style={{ fontSize: '2.2rem', color: 'var(--amber-light)' }} />
          </h2>
          <div className="section-line" />
          <p className="section-desc">
            <em>Secure your spot on the stage</em>
          </p>
        </div>

        <div className="register-card">
          <form className="register-form" onSubmit={handleSubmit}>
            <div className="register-form-row">
              {/* Participant 1 */}
              <div className="register-field">
                <label className="register-label" htmlFor="participant1">Participant 1 Full Name *</label>
                <input
                  type="text"
                  id="participant1"
                  name="participant1"
                  value={formData.participant1}
                  onChange={handleInputChange}
                  className={errors.participant1 ? 'error-field' : ''}
                  disabled={isSubmitting}
                />
                {errors.participant1 && (
                  <span className="error-message">
                    <FiAlertCircle /> {errors.participant1}
                  </span>
                )}
              </div>

              {/* Participant 2 */}
              <div className="register-field">
                <label className="register-label" htmlFor="participant2">Participant 2 Full Name *</label>
                <input
                  type="text"
                  id="participant2"
                  name="participant2"
                  value={formData.participant2}
                  onChange={handleInputChange}
                  className={errors.participant2 ? 'error-field' : ''}
                  disabled={isSubmitting}
                />
                {errors.participant2 && (
                  <span className="error-message">
                    <FiAlertCircle /> {errors.participant2}
                  </span>
                )}
              </div>
            </div>

            {/* University / School Name */}
            <div className="register-field full-width">
              <label className="register-label" htmlFor="institution">University / School Name *</label>
              <input
                type="text"
                id="institution"
                name="institution"
                value={formData.institution}
                onChange={handleInputChange}
                className={errors.institution ? 'error-field' : ''}
                disabled={isSubmitting}
              />
              {errors.institution && (
                <span className="error-message">
                  <FiAlertCircle /> {errors.institution}
                </span>
              )}
            </div>

            <div className="register-form-row">
              {/* Category */}
              <div className="register-field">
                <label className="register-label">Category *</label>
                <div className="pill-group">
                  <div className="pill-option">
                    <input
                      type="radio"
                      id="cat-uni"
                      name="category"
                      value="University"
                      checked={formData.category === 'University'}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                    />
                    <label htmlFor="cat-uni" className="pill-label">University</label>
                  </div>
                  <div className="pill-option">
                    <input
                      type="radio"
                      id="cat-school"
                      name="category"
                      value="School"
                      checked={formData.category === 'School'}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                    />
                    <label htmlFor="cat-school" className="pill-label">School</label>
                  </div>
                </div>
                {errors.category && (
                  <span className="error-message">
                    <FiAlertCircle /> {errors.category}
                  </span>
                )}
              </div>

              {/* Language Medium */}
              <div className="register-field">
                <label className="register-label">Language Medium *</label>
                <div className="pill-group">
                  <div className="pill-option">
                    <input
                      type="radio"
                      id="lang-sinhala"
                      name="language"
                      value="Sinhala"
                      checked={formData.language === 'Sinhala'}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                    />
                    <label htmlFor="lang-sinhala" className="pill-label">Sinhala</label>
                  </div>
                  <div className="pill-option">
                    <input
                      type="radio"
                      id="lang-english"
                      name="language"
                      value="English"
                      checked={formData.language === 'English'}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                    />
                    <label htmlFor="lang-english" className="pill-label">English</label>
                  </div>
                  <div className="pill-option">
                    <input
                      type="radio"
                      id="lang-tamil"
                      name="language"
                      value="Tamil"
                      checked={formData.language === 'Tamil'}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                    />
                    <label htmlFor="lang-tamil" className="pill-label">Tamil</label>
                  </div>
                </div>
                {errors.language && (
                  <span className="error-message">
                    <FiAlertCircle /> {errors.language}
                  </span>
                )}
              </div>
            </div>

            <div className="register-form-row">
              {/* Contact Number */}
              <div className="register-field">
                <label className="register-label" htmlFor="contact">Contact Number *</label>
                <input
                  type="tel"
                  id="contact"
                  name="contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                  className={errors.contact ? 'error-field' : ''}
                  disabled={isSubmitting}
                />
                {errors.contact && (
                  <span className="error-message">
                    <FiAlertCircle /> {errors.contact}
                  </span>
                )}
              </div>

              {/* Email Address */}
              <div className="register-field">
                <label className="register-label" htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={errors.email ? 'error-field' : ''}
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <span className="error-message">
                    <FiAlertCircle /> {errors.email}
                  </span>
                )}
              </div>
            </div>

            {/* Message / Special Notes */}
            <div className="register-field full-width">
              <label className="register-label" htmlFor="message">Message / Special Notes (Optional)</label>
              <textarea
                id="message"
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleInputChange}
                disabled={isSubmitting}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn-primary full-width"
              disabled={isSubmitting}
              style={{ width: '100%', marginTop: '1rem', cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
            >
              <div className="submit-btn-inner">
                <span>{isSubmitting ? 'Submitting...' : 'Submit Registration'}</span>
                {isSubmitting ? <span className="spinner" /> : <FiSend />}
              </div>
            </button>

            {/* Inline Error Message */}
            {submitStatus === 'error' && (
              <div className="form-global-error">
                <FiAlertCircle /> {errorMessage}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
