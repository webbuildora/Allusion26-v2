import React from 'react';
import { BsMicFill } from 'react-icons/bs';

export default function Categories() {
  const categoriesData = [
    { 
      lang: 'Sinhala', 
      title: 'සිංහල', 
      desc: 'Open to all university undergraduates and school students who wish to showcase their announcing talent in Sinhala, the language spoken by most Sri Lankans.', 
      tag: 'Duo-Based' 
    },
    { 
      lang: 'Tamil', 
      title: 'தமிழ்', 
      desc: 'A dedicated platform for Tamil-medium participants to shine in the art of announcing, representing a rich linguistic and cultural heritage.', 
      tag: 'Duo-Based' 
    },
    { 
      lang: 'English', 
      title: 'English', 
      desc: 'Present your announcing prowess in English on a national stage, competing with university students and school students across the island.', 
      tag: 'Duo-Based' 
    }
  ];

  return (
    <section id="categories" className="alt-bg">
      <div className="section-inner">
        <div className="section-header">
          <span className="section-eyebrow">Competition Tracks</span>
          <h2 className="section-title">Three Languages, One Stage</h2>
          <div className="section-line" />
          <p className="section-desc">
            Compete as a duo in the language of your choice and showcase your announcing talent on a national platform.
          </p>
        </div>
        
        <div className="categories-grid">
          {categoriesData.map((c) => (
            <div key={c.lang} className="cat-card">
              <BsMicFill className="cat-icon" />
              <div className="cat-title">{c.title}</div>
              <p className="cat-desc">{c.desc}</p>
              <span className="cat-tag">{c.tag}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
