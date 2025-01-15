import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate('/portal'), 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return <div>Unauthorized! Redirecting to login...</div>;
};

export default UnauthorizedPage;
