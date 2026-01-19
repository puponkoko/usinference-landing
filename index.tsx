
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import DottedGlowBackground from './components/DottedGlowBackground';
import { ArrowRightIcon, SparklesIcon, CodeIcon, GridIcon } from './components/Icons';

// --- Components ---

const NeuralFibers = ({ active }: { active: boolean }) => {
  return (
    <div className={`fibers-container ${active ? 'active' : ''}`}>
      {/* Primary radiating rays */}
      {[...Array(32)].map((_, i) => (
        <div 
          key={`ray-${i}`} 
          className="fiber-path primary" 
          style={{ 
            '--rotateX': `${Math.random() * 360}deg`,
            '--rotateY': `${Math.random() * 360}deg`,
            '--delay': `${Math.random() * 0.5}s`,
            '--duration': `${2 + Math.random() * 2}s`,
            '--length': `${150 + Math.random() * 150}px`
          } as React.CSSProperties} 
        />
      ))}
      
      {/* Smaller web-like connections */}
      {[...Array(20)].map((_, i) => (
        <div 
          key={`web-${i}`} 
          className="fiber-path secondary" 
          style={{ 
            '--rotateX': `${Math.random() * 360}deg`,
            '--rotateY': `${Math.random() * 360}deg`,
            '--delay': `${Math.random() * 1}s`,
            '--duration': `${3 + Math.random() * 3}s`,
            '--length': `${80 + Math.random() * 60}px`
          } as React.CSSProperties} 
        />
      ))}
    </div>
  );
};

const Logo3D = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="us-inference-brand"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="logo-geometry">
        <div className="cube-wrapper">
          {/* Axis Labels */}
          <div className="axis-label u-label">u</div>
          <div className="axis-label s-label">s</div>
          
          {/* Axis Lines */}
          <div className="axis-line u-axis"><div className="arrow-head"></div></div>
          <div className="axis-line s-axis"><div className="arrow-head"></div></div>

          <div className="cube-scene">
            <div className={`core-intelligence ${isHovered ? 'active' : ''}`}></div>
            <NeuralFibers active={isHovered} />
            
            <div className={`main-cube ${isHovered ? 'boost' : ''}`}>
              <div className="face front"></div>
              <div className="face back"></div>
              <div className="face right"></div>
              <div className="face left"></div>
              <div className="face top"></div>
              <div className="face bottom"></div>
              
              <div className="inner-cube-wireframe tier-1">
                <div className="face front"></div>
                <div className="face back"></div>
                <div className="face right"></div>
                <div className="face left"></div>
                <div className="face top"></div>
                <div className="face bottom"></div>
              </div>
              
              <div className="inner-cube-wireframe tier-2">
                <div className="face front"></div>
                <div className="face back"></div>
                <div className="face right"></div>
                <div className="face left"></div>
                <div className="face top"></div>
                <div className="face bottom"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h1 className="brand-text">inference</h1>
    </div>
  );
};

const VideoCard = ({ title, subtitle, videoSrc }: { title: string, subtitle: string, videoSrc?: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div 
      className={`video-card ${isPlaying ? 'playing' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="video-viewport">
        {videoSrc ? (
          <video 
            ref={videoRef}
            src={videoSrc}
            muted 
            loop 
            playsInline
            className="simulation-video"
          />
        ) : (
          <div className="video-placeholder">
            <div className="wireframe-animation"></div>
            <div className="status-label">SIMULATION_READY</div>
          </div>
        )}
        <div className="video-overlay"></div>
      </div>
      <div className="video-info">
        <span className="info-tag">SIM_MODE_0{Math.floor(Math.random() * 9)}</span>
        <h3>{title}</h3>
        <p>{subtitle}</p>
      </div>
    </div>
  );
};

const Navbar = () => (
  <nav className="navbar">
    <div className="nav-logo">inference</div>
    <div className="nav-links">
      <a href="#simulations">Simulations</a>
      <a href="#vision">Vision</a>
      <a href="#api">API</a>
      <button className="nav-cta">Request Access</button>
    </div>
  </nav>
);

const FeatureCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <div className="feature-card">
    <div className="feature-icon"><Icon /></div>
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

function App() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 2800);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <div className="inference-landing">
      {showIntro && (
        <div className="intro-overlay">
          <div className="intro-content">
            <div className="intro-cube-burst">
               <div className="intro-cube-inner"></div>
            </div>
            <div className="intro-text">INITIALIZING INFERENCE PROTOCOL</div>
            <div className="intro-progress">
               <div className="progress-fill"></div>
            </div>
          </div>
        </div>
      )}

      <DottedGlowBackground 
        gap={35} 
        radius={1} 
        color="rgba(255, 255, 255, 0.03)" 
        glowColor="rgba(59, 130, 246, 0.4)" 
        speedScale={0.25} 
        repelRadius={200}
        repelStrength={0.6}
      />
      
      <Navbar />

      <main className={showIntro ? 'content-hidden' : 'content-visible'}>
        {/* Hero Section */}
        <section className="hero">
          <Logo3D />
          <p className="hero-subtitle">
            The mathematical foundation for the next generation of intelligence. 
            Optimizing token density along the <strong>u/s axis</strong>.
          </p>
          
          <div className="cta-container">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="waitlist-form">
                <input 
                  type="email" 
                  placeholder="Enter your work email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit">Join Stealth Waitlist <ArrowRightIcon /></button>
              </form>
            ) : (
              <div className="success-message">
                <SparklesIcon /> Access requested. Synthesizing invitation.
              </div>
            )}
            <span className="domain-tag">usinference.com</span>
          </div>
        </section>

        {/* Video Simulations Section */}
        <section className="simulations-section" id="simulations">
          <div className="section-header">
            <span className="eyebrow">Visualizing Intelligence</span>
            <h2>Core Simulations</h2>
            <p>Interactive renders of our inference mesh at sub-atomic scale.</p>
          </div>
          <div className="simulations-grid">
            <VideoCard 
              title="Manifold Expansion" 
              subtitle="Dynamics of uncertainty calibration across high-dimensional latent space."
            />
            <VideoCard 
              title="Fiber Growth" 
              subtitle="Visualizing the synthesis of new neural pathways during real-time inference."
            />
          </div>
        </section>

        {/* Bento Grid Features */}
        <section className="features-grid" id="vision">
          <div className="bento-container">
            <div className="bento-item large">
              <div className="bento-content">
                <span className="tag">Protocol</span>
                <h2>Sub-millisecond Latency</h2>
                <p>Proprietary kernel optimizations for frontier models, achieving near-hardware theoretical throughput across distributed compute clusters.</p>
              </div>
              <div className="bento-visual">
                <div className="pulse-circle"></div>
              </div>
            </div>
            
            <div className="bento-item small">
              <FeatureCard 
                icon={CodeIcon} 
                title="Unified SDK" 
                description="Drop-in performance. Seamlessly transition legacy inference workloads to our high-density substrate."
              />
            </div>

            <div className="bento-item small">
              <FeatureCard 
                icon={GridIcon} 
                title="Compute Mesh" 
                description="Global adaptive mesh that dynamically rebalances compute density based on regional inference pressure."
              />
            </div>

            <div className="bento-item wide">
              <div className="bento-content">
                <h2>The u/s Axis Paradigm</h2>
                <p>Quantifying Uncertainty (u) against Scale (s). We don't just generate tokens; we synthesize calibrated intelligence for enterprise reliability.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">inference</div>
          <div className="footer-links">
            <a href="#">Twitter</a>
            <a href="#">GitHub</a>
            <a href="#">Docs</a>
          </div>
          <p>© 2025 Inference Inc. Stealth Operations Protocol.</p>
        </div>
      </footer>
    </div>
  );
}

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<React.StrictMode><App /></React.StrictMode>);
}
