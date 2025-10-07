import "./App.css";
import { signInWithGitHub } from "./auth/githubSignIn";

function App() {

  return (
    <>
      <button onClick={signInWithGitHub}>LogIn with GitHub</button>
    </>
  );
}

export default App;
