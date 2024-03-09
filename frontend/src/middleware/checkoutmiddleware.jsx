import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function ProtectedCheckout( children)  {
  const {Component}=children;
  const navigate = useNavigate();

  useEffect(() => {
    const cookie = Cookies.get('authToken-b');

    console.log('Checking cookie:', cookie);

    if (!cookie) {
      console.log('No cookie found, navigating to /login');
      navigate('/login');
      return; // Exit the function early if the cookie is not present
    }
    else{
      console.log("Checkout here")
    }

    console.log('Got cookie:', cookie);

    try {
      const payload = atob(cookie.split('.')[1]);
      const decodedPayload = JSON.parse(payload);
      console.log('Decoded payload:', decodedPayload.role);

      // Uncomment and modify the logic based on your requirements
      // if (decodedPayload.role === 'admin') {
      //   // Handle admin case
      //   // navigate('/login');
      // }

    } catch (error) {
      console.error('Error decoding payload:', error);
    }

  }, [navigate]);

  return <div><Component /></div>;
}

export default ProtectedCheckout;
