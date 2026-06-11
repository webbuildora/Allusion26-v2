import React from 'react';
import {
  FaFacebook,
  FaYoutube,
  FaInstagram,
  FaTiktok,
  FaTwitter,
  FaLinkedin
} from 'react-icons/fa';

export default function Footer() {
  return (
    <footer>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '24px', marginBottom: '1.5rem' }}>
        <img src="/logos/jpura_voice_logo.png" alt="J'PURA VOICE" style={{ height: '75px', width: 'auto', objectFit: 'contain' }} />
        <img src="/logos/announcing_division_logo.png" alt="Announcing Division" style={{ height: '75px', width: 'auto', objectFit: 'contain' }} />
        <img src="/logos/Allusion26.png" alt="Allusion'26" style={{ height: '60px', width: 'auto', objectFit: 'contain' }} />
      </div>
      <div className="footer-org">Organized by J'PURA VOICE · University of Sri Jayewardenepura</div>
      <div className="footer-copy">© 2026 Allusion'26 — Announcing Division, J'PURA VOICE. All rights reserved.</div>

      <div className="footer-socials" style={{ marginTop: '1.5rem' }}>
        <a href="#" className="footer-social-link" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
          <FaFacebook />
        </a>
        <a href="#" className="footer-social-link" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
          <FaYoutube />
        </a>
        <a href="#" className="footer-social-link" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <FaInstagram />
        </a>
        <a href="#" className="footer-social-link" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
          <FaTiktok />
        </a>
        <a href="#" className="footer-social-link" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
          <FaTwitter />
        </a>
        <a href="#" className="footer-social-link" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <FaLinkedin />
        </a>
      </div>
    </footer>
  );
}
