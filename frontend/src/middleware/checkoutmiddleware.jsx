import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function ProtectedCheckout({ email, password, children }) {
  const navigate = useNavigate();

  const cookie = Cookies.get('authToken-b');
  console.log("get cookie", cookie);

if(cookie){
console.log('can go to checkout')}
else{
  navigate('/login')

}

const payload = atob(cookie.split('.')[1]);
const decodedPayload = JSON.parse(payload);
console.log('Decoded payload:', decodedPayload.role);
if(decodedPayload.role==='admin'){
    // navigate('/login');

}


  return <div>{children}</div>;
}

export default ProtectedCheckout;
