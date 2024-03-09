import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function ProtectedRoute( children ) {
  const {Component}=children;
  console.log(Component)
  const navigate = useNavigate();

  useEffect(() => {
    
  const cookie = Cookies.get('authToken-b');

  if(!cookie){
    navigate('/login')
  }
  
if(cookie){
  const payload = atob(cookie.split('.')[1]);
  const decodedPayload = JSON.parse(payload);
  console.log('Decoded payload:', decodedPayload.role);
  if(decodedPayload.role!=='admin'){
       navigate('/login');
  
  }
  }
  }, [ navigate]);
return(<Component />)
}

export default ProtectedRoute;
