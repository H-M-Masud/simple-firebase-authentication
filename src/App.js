import './App.css';
import { getAuth, GithubAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import app from './firebase.init';
import { GoogleAuthProvider } from "firebase/auth";
import { useState } from 'react';

const auth = getAuth(app);

function App() {
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const [user, setUser] = useState({})

  // sign in with google
  const handleGoogleSignIn = ()=>{
    signInWithPopup(auth, googleProvider)
    .then(res =>{
      const result = res.user;
      setUser(result)
    })
    .catch(error =>{
      console.log(error)
    })
  }

  // sign in with github
  const handleGithubSignIn = () =>{
    signInWithPopup(auth, githubProvider)
    .then(res =>{
      const result = res.user;
      setUser(result)
    })
    .catch(error =>{
      console.log(error)
    })
  }

  // sign out
  const handleSignOut = () =>{
    signOut(auth)
    .then(() =>{
      setUser({})
    })
    .catch(error =>{
      setUser({})
    })
  }
 
  return (
    <div className="App">
      {
        user.uid ?   <button onClick={handleSignOut}>Sign Out</button>   :
       <div>
          <button onClick={handleGoogleSignIn}>Google Sign In</button>
          <button onClick={handleGithubSignIn}>Github Sign In</button>
       </div>

      }
    
      <h2>{user.displayName}</h2>
      <p>{user.email}</p>
      <img src={user.photoURL} alt="" />
    </div>
  );
}

export default App;
