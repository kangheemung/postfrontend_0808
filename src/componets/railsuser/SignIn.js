
    import React, { useState } from 'react';

    const SignIn = () => {
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
          const response = await fetch('/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          });
          
          const data = await response.json();
          
          if (response.ok) {
            // Successful sign-in logic here, such as redirecting the user to their dashboard page
            console.log(data.message);
          } else {
            // Display error message to the user
            console.error(data.message);
          }
        } catch (error) {
          console.error('An error occurred:', error);
        }
      };
    
      return (
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit">Sign In</button>
        </form>
      );
    };
    
    export default SignIn;

