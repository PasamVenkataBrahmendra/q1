import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaAtom, FaChartLine, FaServer } from 'react-icons/fa';
import './About.css';

const About = () => {
  const teamMembers = [
    {
      name: 'Pavan',
      role: 'Data Sourcing',
      bio: 'Specializes in financial data acquisition and API integration.',
      image: 'https://via.placeholder.com/150',
      social: {
        github: 'https://github.com',
        linkedin: 'https://linkedin.com',
        email: 'mailto:pavan@example.com'
      }
    },
    {
      name: 'Sangeeth',
      role: 'Data Preprocessing',
      bio: 'Expert in data cleaning, normalization, and feature engineering.',
      image: 'https://via.placeholder.com/150',
      social: {
        github: 'https://github.com',
        linkedin: 'https://linkedin.com',
        email: 'mailto:sangeeth@example.com'
      }
    },
    {
      name: 'Deepika',
      role: 'Classical ML',
      bio: 'Implements traditional machine learning models for baseline comparison.',
      image: 'https://via.placeholder.com/150',
      social: {
        github: 'https://github.com',
        linkedin: 'https://linkedin.com',
        email: 'mailto:deepika@example.com'
      }
    },
    {
      name: 'Manoj',
      role: 'Research & Optimization',
      bio: 'Focuses on algorithm optimization and research implementation.',
      image: 'https://via.placeholder.com/150',
      social: {
        github: 'https://github.com',
        linkedin: 'https://linkedin.com',
        email: 'mailto:manoj@example.com'
      }
    },
    {
      name: 'Bhargavi',
      role: 'Quantum ML',
      bio: 'Develops quantum machine learning algorithms for stock prediction.',
      image: 'https://via.placeholder.com/150',
      social: {
        github: 'https://github.com',
        linkedin: 'https://linkedin.com',
        email: 'mailto:bhargavi@example.com'
      }
    },
    {
      name: 'Brahmendra',
      role: 'Frontend & Backend',
      bio: 'Full-stack developer responsible for the web application architecture.',
      image: 'https://via.placeholder.com/150',
      social: {
        github: 'https://github.com',
        linkedin: 'https://linkedin.com',
        email: 'mailto:brahmendra@example.com'
      }
    }
  ];

  return (
    <div className="about-page">
      <div className="about-header">
        <h1>About QuantumStock</h1>
        <p className="about-subtitle">
          Revolutionizing stock market prediction with quantum machine learning
        </p>
      </div>

      <div className="about-section">
        <h2>Our Mission</h2>
        <p>
          QuantumStock aims to leverage the power of quantum computing and machine learning to provide more accurate stock market predictions than traditional methods. By utilizing quantum algorithms, we can process complex market patterns and identify hidden correlations that classical computers might miss.
        </p>
        <p>
          Our platform combines cutting-edge quantum machine learning techniques with user-friendly visualization tools, making advanced financial analysis accessible to both professional traders and individual investors.
        </p>
      </div>

      <div className="about-section">
        <h2>The Technology</h2>
        <div className="tech-cards">
          <div className="tech-card">
            <div className="tech-icon">
              <FaAtom />
            </div>
            <h3>Quantum Machine Learning</h3>
            <p>
              We implement quantum neural networks and quantum support vector machines using Qiskit and PennyLane frameworks. These quantum algorithms can process multiple market scenarios simultaneously through quantum superposition, leading to more comprehensive analysis.
            </p>
          </div>

          <div className="tech-card">
            <div className="tech-icon">
              <FaChartLine />
            </div>
            <h3>Advanced Visualization</h3>
            <p>
              Our platform features interactive 3D visualizations built with Three.js and React Three Fiber, allowing users to explore stock data from multiple perspectives and identify patterns that might be missed in traditional 2D charts.
            </p>
          </div>

          <div className="tech-card">
            <div className="tech-icon">
              <FaServer />
            </div>
            <h3>Hybrid Architecture</h3>
            <p>
              We employ a hybrid quantum-classical approach, using quantum computing for specific computational tasks where it offers advantages, while leveraging classical computing for other parts of the pipeline, ensuring optimal performance and resource utilization.
            </p>
          </div>
        </div>
      </div>

      <div className="about-section">
        <h2>Our Team</h2>
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div className="team-card" key={index}>
              <div className="member-image">
                <img src={member.image} alt={member.name} />
              </div>
              <h3>{member.name}</h3>
              <p className="member-role">{member.role}</p>
              <p className="member-bio">{member.bio}</p>
              <div className="social-links">
                <a href={member.social.github} target="_blank" rel="noopener noreferrer" className="social-link">
                  <FaGithub />
                </a>
                <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="social-link">
                  <FaLinkedin />
                </a>
                <a href={member.social.email} className="social-link">
                  <FaEnvelope />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="about-section">
        <h2>Research Background</h2>
        <div className="research-content">
          <p>
            Our work is based on recent advancements in quantum machine learning for financial applications. Quantum computing offers potential advantages in processing complex financial data due to its ability to handle high-dimensional feature spaces and identify non-linear patterns.
          </p>
          <p>
            Key research areas we focus on include:
          </p>
          <ul className="research-list">
            <li>
              <strong>Quantum Neural Networks (QNNs):</strong> Implementing variational quantum circuits that can learn patterns in stock market data.
            </li>
            <li>
              <strong>Quantum Feature Maps:</strong> Using quantum kernels to map classical data into quantum Hilbert spaces for improved pattern recognition.
            </li>
            <li>
              <strong>Quantum Ensemble Methods:</strong> Combining multiple quantum models to reduce prediction variance and improve robustness.
            </li>
            <li>
              <strong>Quantum-Enhanced Technical Analysis:</strong> Applying quantum algorithms to traditional technical indicators for improved signal detection.
            </li>
          </ul>
          <p>
            While quantum computing is still in its early stages, our research indicates that even with current NISQ (Noisy Intermediate-Scale Quantum) devices, we can achieve modest improvements over classical methods in specific market conditions.
          </p>
        </div>
      </div>

      <div className="about-section disclaimer-section">
        <h2>Disclaimer</h2>
        <div className="disclaimer-content">
          <p>
            QuantumStock is a research and educational project. The predictions and analyses provided by this platform should not be considered financial advice. Stock market investments involve risk, and past performance is not indicative of future results.
          </p>
          <p>
            This application is currently in demonstration mode, using simulated data for educational purposes. In a production environment, it would connect to real-time market data sources and quantum computing resources.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;