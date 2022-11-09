import { useState } from 'react';
import SignIn from '../components/auth/SignIn';
import SignUp from '../components/auth/SignUp';

export default function Auth({ setUser }) {
  const [isSignUp, setIsSignUp] = useState(false);
  return (
    <div className='flex items-center justify-center h-full'>
      {isSignUp ? (
        <SignUp setUser={setUser} goToSignin={() => setIsSignUp(false)} />
      ) : (
        <SignIn setUser={setUser} goToSignUp={() => setIsSignUp(true)} />
      )}
    </div>
  );
}
