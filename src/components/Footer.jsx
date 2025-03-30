import Image from 'react-bootstrap/Image';

export default function Footer() {
  return (
    <footer style={{ marginTop: 'auto' }}>
      <div
        className="d-flex justify-content-evenly align-items-center bg-primary py-3"
        style={{
          height: '75px',
          boxShadow: '0 0.5rem 0.5rem rgba(0, 0, 0, 0.3)'
        }}
      >
        <Image src="/banner.png" width={100} alt="Logo" />
        <a href="https://github.com/test9944" className="fw-medium text-white">
          © 2024 Test_Agent
        </a>
      </div>
    </footer>
  );
}
