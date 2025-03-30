// src/pages/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';

export default function Home() {
  const navigate = useNavigate();

  return (
    <Container fluid className="p-0" 
      style={{
        background: 'url(/image.png) no-repeat center center', 
        backgroundSize: 'cover',
        minHeight: '100vh',
        position: 'relative',
      }}
    >
      {/* Overlay for darkening background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)'
      }}></div>
      
      <Row 
        className="justify-content-center align-items-center" 
        style={{ minHeight: '100vh', position: 'relative', zIndex: 2 }}
      >
        <Col md={8} className="text-center text-white">
          <h1 className="display-3 fw-bold">Welcome to Quick Cart</h1>
          <p className="lead">
            Experience a seamless and secure shopping journey with us.
          </p>
          <Button 
            variant="primary" 
            size="lg" 
            onClick={() => navigate("/login")}
            style={{ padding: '12px 30px', fontSize: '1.25rem' }}
          >
            Get Started
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
