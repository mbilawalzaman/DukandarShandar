import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function ProtectedRoute({ email, password, children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
        try {
          const response = await fetch('http://localhost:4000/getsession', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
              email: email || '',
              password: password || '',
            }),
          });
      
          if (response.ok) {
            const responseData = await response.json();
            console.log('Session data:', responseData);
        
            if (responseData.error || !responseData.token) {
                console.log('Error in session check:', responseData.error || 'Token not found');
                Cookies.remove('session');
                navigate('/login');
            } else {
                Cookies.set('session', 'loggedIn');
                navigate('/admin');
            }
        } else {
            const errorData = await response.json();
            console.error(`Error checking session. Status: ${response.status}, Message: ${errorData.message}`);
            Cookies.remove('session');
            navigate('/login');
        }
        } catch (error) {
          console.error('Error checking session:', error);
          Cookies.remove('session');
          navigate('/login');
        }
      };
      

    // checkSession();
  }, [email, password, navigate]);

  const cookie = Cookies.get('authToken-b');
console.log("get cookie", cookie);

const payload = atob(cookie.split('.')[1]);
const decodedPayload = JSON.parse(payload);
console.log('Decoded payload:', decodedPayload.role);
if(decodedPayload.role==='admin'){
    // navigate('/login');

}


  return <div>{children}</div>;
}

export default ProtectedRoute;
