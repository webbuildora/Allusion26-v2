/*
 * ─── GOOGLE APPS SCRIPT ────────────────────────────────────────────
 * Update the doPost function in your Apps Script to handle all fields below.
 * ───────────────────────────────────────────────────────────────────
 */

const SHEET_ENDPOINT = 'https://script.google.com/macros/s/AKfycbzTdg29hhFCwu_u6gotitMZoXCLmNiJpNeM7UNarCinPgT8UgiOhlvaROWhctnFK3_t/exec';
const SRI_LANKA_DISTRICTS = [
  'Ampara','Anuradhapura','Badulla','Batticaloa','Colombo','Galle','Gampaha',
  'Hambantota','Jaffna','Kalutara','Kandy','Kegalle','Kilinochchi','Kurunegala',
  'Mannar','Matale','Matara','Monaragala','Mullaitivu','Nuwara Eliya','Polonnaruwa',
  'Puttalam','Ratnapura','Trincomalee','Vavuniya'
];

import React, { useState } from 'react';
import { FiEdit3, FiSend, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';

const INITIAL_STATE = {
  teamCategory: '',
  preferredLanguage: '',
  // School fields
  district: '',
  schoolName: '',
  schoolAddress: '',
  teamName: '',
  // Contestant 1
  c1Name: '',
  c1Email: '',
  c1Phone: '',
  c1Grade: '',
  // Contestant 2
  c2Name: '',
  c2Email: '',
  c2Phone: '',
  c2Grade: '',
  // Teacher-in-charge (school)
  teacherName: '',
  teacherPhone: '',
  teacherEmail: '',
  // University fields
  universityName: '',
  faculty: '',
  uniTeamName: '',
  // Uni Contestant 1
  uc1Name: '',
  uc1RegNo: '',
  uc1Phone: '',
  uc1Email: '',
  uc1Year: '',
  // Uni Contestant 2
  uc2Name: '',
  uc2RegNo: '',
  uc2Phone: '',
  uc2Email: '',
  uc2Year: '',
  declaration: false,
};

export default function Register() {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const isSchool = formData.teamCategory === 'School';
  const isUniversity = formData.teamCategory === 'University';

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const req = (val, msg) => (!val || !val.toString().trim()) ? msg : '';
  const reqEmail = (val) => {
    if (!val.trim()) return 'Email is required';
    if (!/\S+@\S+\.\S+/.test(val)) return 'Invalid email address';
    return '';
  };

  const validate = () => {
    const e = {};
    e.teamCategory = req(formData.teamCategory, 'Team category is required');
    e.preferredLanguage = req(formData.preferredLanguage, 'Preferred language is required');

    if (isSchool) {
      e.district = req(formData.district, 'District is required');
      e.schoolName = req(formData.schoolName, 'School name is required');
      e.teamName = req(formData.teamName, 'Team / Duo name is required');
      e.c1Name = req(formData.c1Name, 'Full name is required');
      e.c1Email = reqEmail(formData.c1Email);
      e.c1Phone = req(formData.c1Phone, 'Phone number is required');
      e.c1Grade = req(formData.c1Grade, 'Grade is required');
      e.c2Name = req(formData.c2Name, 'Full name is required');
      e.c2Email = reqEmail(formData.c2Email);
      e.c2Phone = req(formData.c2Phone, 'Phone number is required');
      e.c2Grade = req(formData.c2Grade, 'Grade is required');
      e.teacherName = req(formData.teacherName, 'Teacher name is required');
      e.teacherPhone = req(formData.teacherPhone, 'Teacher phone is required');
    }

    if (isUniversity) {
      e.universityName = req(formData.universityName, 'University name is required');
      e.faculty = req(formData.faculty, 'Faculty is required');
      e.uniTeamName = req(formData.uniTeamName, 'Team / Duo name is required');
      e.uc1Name = req(formData.uc1Name, 'Full name is required');
      e.uc1RegNo = req(formData.uc1RegNo, 'Registration / MC number is required');
      e.uc1Phone = req(formData.uc1Phone, 'Phone number is required');
      e.uc1Email = reqEmail(formData.uc1Email);
      e.uc2Name = req(formData.uc2Name, 'Full name is required');
      e.uc2RegNo = req(formData.uc2RegNo, 'Registration / MC number is required');
      e.uc2Phone = req(formData.uc2Phone, 'Phone number is required');
      e.uc2Email = reqEmail(formData.uc2Email);
    }

    if (!formData.declaration) e.declaration = 'You must confirm the declaration';

    return Object.fromEntries(Object.entries(e).filter(([, v]) => v));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      const firstErrorKey = Object.keys(validationErrors)[0];
      const el = document.querySelector(`[name="${firstErrorKey}"]`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');
    fetch(SHEET_ENDPOINT, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify(formData),
    })
      .then(() => { setSubmitStatus('success'); })
      .catch(() => {
        setSubmitStatus('error');
        setErrorMessage('Failed to connect to server. Please try again.');
      })
      .finally(() => { setIsSubmitting(false); });
  };

  const Field = ({ id, label, required, error, children }) => (
    <div className="register-field">
      <label className="register-label" htmlFor={id}>
        {label}{required && ' *'}
      </label>
      {children}
      {error && <span className="error-message"><FiAlertCircle /> {error}</span>}
    </div>
  );

  const TextInput = ({ name, type = 'text', placeholder, id }) => (
    <input
      type={type} id={id || name} name={name}
      value={formData[name]} onChange={handleChange}
      className={errors[name] ? 'error-field' : ''}
      placeholder={placeholder || ''}
      disabled={isSubmitting}
    />
  );

  const SectionDivider = ({ title }) => (
    <div className="form-section-divider">
      <span>{title}</span>
    </div>
  );

  if (submitStatus === 'success') {
    return (
      <section id="register">
        <div className="section-inner">
          <div className="success-card">
            <div className="success-icon"><FiCheckCircle /></div>
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
          <p className="section-desc"><em>Secure your spot on the stage</em></p>
        </div>

        <div className="register-card">
          <form className="register-form" onSubmit={handleSubmit}>

            {/* ── GENERAL INFORMATION ── */}
            <SectionDivider title="General Information" />

            <div className="register-form-row">
              {/* Team Category */}
              <Field label="Team Category" required error={errors.teamCategory}>
                <div className="pill-group">
                  {['School', 'University'].map(opt => (
                    <div className="pill-option" key={opt}>
                      <input type="radio" id={`cat-${opt}`} name="teamCategory" value={opt}
                        checked={formData.teamCategory === opt} onChange={handleChange} disabled={isSubmitting} />
                      <label htmlFor={`cat-${opt}`} className="pill-label">{opt} Category</label>
                    </div>
                  ))}
                </div>
              </Field>

              {/* Preferred Language */}
              <Field label="Preferred Language" required error={errors.preferredLanguage}>
                <div className="pill-group">
                  {['Sinhala', 'Tamil', 'English'].map(opt => (
                    <div className="pill-option" key={opt}>
                      <input type="radio" id={`lang-${opt}`} name="preferredLanguage" value={opt}
                        checked={formData.preferredLanguage === opt} onChange={handleChange} disabled={isSubmitting} />
                      <label htmlFor={`lang-${opt}`} className="pill-label">{opt}</label>
                    </div>
                  ))}
                </div>
              </Field>
            </div>

            {/* ══════════════════════════════════════════ */}
            {/* SCHOOL CATEGORY                            */}
            {/* ══════════════════════════════════════════ */}
            {isSchool && (
              <>
                <SectionDivider title="School Information" />

                <div className="register-form-row">
                  <Field label="District" required error={errors.district}>
                    <select name="district" id="district" value={formData.district}
                      onChange={handleChange} className={errors.district ? 'error-field' : ''} disabled={isSubmitting}>
                      <option value="">Select District</option>
                      {SRI_LANKA_DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </Field>
                  <Field label="School Name" required error={errors.schoolName}>
                    <TextInput name="schoolName" />
                  </Field>
                </div>

                <div className="register-form-row">
                  <Field label="School Address" error={errors.schoolAddress}>
                    <TextInput name="schoolAddress" />
                  </Field>
                  <Field label="Team / Duo Name" required error={errors.teamName}>
                    <TextInput name="teamName" />
                  </Field>
                </div>

                <SectionDivider title="Contestant 1 Details" />
                <div className="register-form-row">
                  <Field label="First Contestant Full Name" required error={errors.c1Name}>
                    <TextInput name="c1Name" />
                  </Field>
                  <Field label="Email Address" required error={errors.c1Email}>
                    <TextInput name="c1Email" type="email" />
                  </Field>
                </div>
                <div className="register-form-row">
                  <Field label="Phone Number / WhatsApp Number" required error={errors.c1Phone}>
                    <TextInput name="c1Phone" type="tel" />
                  </Field>
                  <Field label="Grade" required error={errors.c1Grade}>
                    <TextInput name="c1Grade" placeholder="e.g. Grade 12" />
                  </Field>
                </div>

                <SectionDivider title="Contestant 2 Details" />
                <div className="register-form-row">
                  <Field label="Second Contestant Full Name" required error={errors.c2Name}>
                    <TextInput name="c2Name" />
                  </Field>
                  <Field label="Email Address" required error={errors.c2Email}>
                    <TextInput name="c2Email" type="email" />
                  </Field>
                </div>
                <div className="register-form-row">
                  <Field label="Phone Number / WhatsApp Number" required error={errors.c2Phone}>
                    <TextInput name="c2Phone" type="tel" />
                  </Field>
                  <Field label="Grade" required error={errors.c2Grade}>
                    <TextInput name="c2Grade" placeholder="e.g. Grade 11" />
                  </Field>
                </div>

                <SectionDivider title="Teacher-in-Charge Details" />
                <div className="register-form-row">
                  <Field label="Teacher-in-Charge Name" required error={errors.teacherName}>
                    <TextInput name="teacherName" />
                  </Field>
                  <Field label="Teacher-in-Charge Phone Number" required error={errors.teacherPhone}>
                    <TextInput name="teacherPhone" type="tel" />
                  </Field>
                </div>
                <div className="register-form-row">
                  <Field label="Teacher-in-Charge Email Address" error={errors.teacherEmail}>
                    <TextInput name="teacherEmail" type="email" />
                  </Field>
                  <div className="register-field" />
                </div>
              </>
            )}

            {/* ══════════════════════════════════════════ */}
            {/* UNIVERSITY CATEGORY                        */}
            {/* ══════════════════════════════════════════ */}
            {isUniversity && (
              <>
                <SectionDivider title="University Information" />

                <div className="register-form-row">
                  <Field label="University Name" required error={errors.universityName}>
                    <TextInput name="universityName" />
                  </Field>
                  <Field label="Faculty" required error={errors.faculty}>
                    <TextInput name="faculty" />
                  </Field>
                </div>
                <div className="register-form-row">
                  <Field label="Team / Duo Name" required error={errors.uniTeamName}>
                    <TextInput name="uniTeamName" />
                  </Field>
                  <div className="register-field" />
                </div>

                <SectionDivider title="Contestant 1 Details" />
                <div className="register-form-row">
                  <Field label="First Contestant Full Name" required error={errors.uc1Name}>
                    <TextInput name="uc1Name" />
                  </Field>
                  <Field label="Registration / MC Number" required error={errors.uc1RegNo}>
                    <TextInput name="uc1RegNo" />
                  </Field>
                </div>
                <div className="register-form-row">
                  <Field label="Phone Number / WhatsApp Number" required error={errors.uc1Phone}>
                    <TextInput name="uc1Phone" type="tel" />
                  </Field>
                  <Field label="Email Address" required error={errors.uc1Email}>
                    <TextInput name="uc1Email" type="email" />
                  </Field>
                </div>
                <div className="register-form-row">
                  <Field label="Academic Year" error={errors.uc1Year}>
                    <TextInput name="uc1Year" placeholder="e.g. 2nd Year" />
                  </Field>
                  <div className="register-field" />
                </div>

                <SectionDivider title="Contestant 2 Details" />
                <div className="register-form-row">
                  <Field label="Second Contestant Full Name" required error={errors.uc2Name}>
                    <TextInput name="uc2Name" />
                  </Field>
                  <Field label="Registration / MC Number" required error={errors.uc2RegNo}>
                    <TextInput name="uc2RegNo" />
                  </Field>
                </div>
                <div className="register-form-row">
                  <Field label="Phone Number / WhatsApp Number" required error={errors.uc2Phone}>
                    <TextInput name="uc2Phone" type="tel" />
                  </Field>
                  <Field label="Email Address" required error={errors.uc2Email}>
                    <TextInput name="uc2Email" type="email" />
                  </Field>
                </div>
                <div className="register-form-row">
                  <Field label="Academic Year" error={errors.uc2Year}>
                    <TextInput name="uc2Year" placeholder="e.g. 3rd Year" />
                  </Field>
                  <div className="register-field" />
                </div>
              </>
            )}

            {/* ── DECLARATION ── */}
            {(isSchool || isUniversity) && (
              <>
                <SectionDivider title="Declaration" />
                <div className="register-field full-width">
                  <label className="declaration-label">
                    <input
                      type="checkbox" name="declaration"
                      checked={formData.declaration} onChange={handleChange}
                      disabled={isSubmitting}
                      className={errors.declaration ? 'error-field' : ''}
                    />
                    <span>We confirm that all information provided is accurate.</span>
                  </label>
                  {errors.declaration && (
                    <span className="error-message"><FiAlertCircle /> {errors.declaration}</span>
                  )}
                </div>
              </>
            )}

            {/* ── SUBMIT ── */}
            <button
              type="submit"
              className="btn-primary full-width"
              disabled={isSubmitting || (!isSchool && !isUniversity)}
              style={{ width: '100%', marginTop: '1.5rem', cursor: isSubmitting ? 'not-allowed' : 'pointer', opacity: (!isSchool && !isUniversity) ? 0.5 : 1 }}
            >
              <div className="submit-btn-inner">
                <span>{isSubmitting ? 'Submitting...' : 'Submit Registration'}</span>
                {isSubmitting ? <span className="spinner" /> : <FiSend />}
              </div>
            </button>

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
