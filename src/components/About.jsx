import React from 'react';
import { FiMic, FiUsers, FiRadio, FiStar } from 'react-icons/fi';
import { GiMicrophone } from 'react-icons/gi';

export default function About() {
  return (
    <>
      {/* ── ALLUSION ABOUT ── */}
      <section id="about">
        <div className="section-inner">
          <div className="about-grid">
            <div className="about-text">
              <div className="about-badge">
                <span>
                  <FiMic /> Announcing Division · J'PURA VOICE
                </span>
              </div>

              <div className="section-header" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
                <span className="section-eyebrow">What is Allusion'26?</span>
                <h2 className="section-title">The Stage for<br />Every Voice</h2>
                <div className="section-line" style={{ margin: '0.8rem 0' }} />
              </div>

              <p>
                <strong>ALLUSION'26</strong> is a trilingual inter-university and inter-school announcing competition organized by the Announcing Division of J'PURA VOICE — the Official Media &amp; Broadcasting Unit of the University of Sri Jayewardenepura.
              </p>
              <p>
                The project aims to create a platform for talented personalities while enhancing the announcing and presentation skills of school students and university undergraduates in <strong>Sinhala, English, and Tamil</strong> through a duo-based concept.
              </p>
              <p>
                J'PURA VOICE is the largest university media organization in Sri Lanka with over <strong>600+ active members</strong> across 11 faculties, operating through Announcing, Debating, Dubbing, Filming &amp; Programming, and News Broadcasting divisions.
              </p>

              <div className="about-stats">
                {[
                  ['600+', 'Active Members'],
                  ['11', 'Faculties'],
                  ['26K+', 'Followers'],
                  ['100+', 'Annual Projects']
                ].map(([num, label]) => (
                  <div className="astat" key={label}>
                    <span className="astat-num">{num}</span>
                    <span className="astat-label">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="about-visual">
              <div className="about-ring" />
              <div className="about-ring2" />
              <div className="about-mic-wrap">
                <GiMicrophone
                  style={{
                    fontSize: '9rem',
                    color: 'var(--amber)',
                    filter: 'drop-shadow(0 0 40px rgba(212,135,10,0.4))'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── J'PURA VOICE & ANNOUNCING DIVISION ── */}
      <section id="jpura-voice" style={{ paddingTop: 0 }}>
        <div className="section-inner">
          <div className="section-header">
            <span className="section-eyebrow">The Organizers</span>
            <h2 className="section-title">J'PURA VOICE &amp; Announcing Division</h2>
            <div className="section-line" />
          </div>

          <div className="org-grid">
            {/* J'PURA VOICE card */}
            <div className="org-card">
              <div className="org-card-icon">
                <img src="/logos/jpura_voice_logo.png" alt="J'PURA VOICE" style={{ height: '70px', width: 'auto', objectFit: 'contain' }} />
              </div>
              <div className="org-card-tag">"ONE FAMILY, ONE VOICE"</div>
              <h3 className="org-card-title">J'PURA VOICE</h3>
              <p className="org-card-desc">
                J'PURA VOICE functions as the Official Media &amp; Broadcasting Unit of the University of Sri Jayewardenepura and represents over <strong>600+ active members</strong> across 11 faculties, making it the largest university media organization in Sri Lanka.
              </p>
              <p className="org-card-desc">
                The unit operates through multiple specialized divisions, including Announcing, Debating, Dubbing, Filming &amp; Programming, and News Broadcasting, while also managing official platforms such as <strong>FM J'PURA</strong> and <strong>J'PURA News</strong>.
              </p>
              <p className="org-card-desc">
                J'PURA VOICE actively supports university events, national-level competitions, and media productions while offering students direct exposure to real-world media practices.
              </p>
              <div className="org-card-stats">
                {[['600+', 'Members'], ['11', 'Faculties'], ['5', 'Divisions']].map(([n, l]) => (
                  <div className="org-stat" key={l}>
                    <span className="org-stat-num">{n}</span>
                    <span className="org-stat-label">{l}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Announcing Division card */}
            <div className="org-card">
              <div className="org-card-icon">
                <img src="/logos/announcing_division_logo.png" alt="Announcing Division" style={{ height: '70px', width: 'auto', objectFit: 'contain' }} />
              </div>
              <div className="org-card-tag">Key Pillar of J'PURA VOICE</div>
              <h3 className="org-card-title">Announcing Division</h3>
              <p className="org-card-desc">
                The Announcing Division is one of the key pillars of J'PURA VOICE and has the <strong>largest number of members</strong> within the organization. It plays a significant role in developing the communication, compering, and presentation skills of university undergraduates in Sinhala, English, and Tamil.
              </p>
              <p className="org-card-desc">
                The division provides a platform for members to showcase their talents while building confidence, leadership, and public speaking abilities through projects such as <strong>ALLUSION</strong> and <strong>ANNOUNCING #101</strong>.
              </p>
              <p className="org-card-desc">
                By discovering and empowering hidden voices, the Announcing Division continues to strengthen student talent and maintain a strong presence within J'PURA VOICE.
              </p>
              <div className="org-card-stats">
                {[['3', 'Languages'], ['2', 'Key Projects'], ['#1', 'By Members']].map(([n, l]) => (
                  <div className="org-stat" key={l}>
                    <span className="org-stat-num">{n}</span>
                    <span className="org-stat-label">{l}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
