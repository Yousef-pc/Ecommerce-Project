import './LoginForm.css';

export function LoginForm({ isPassVisible, setIsPassVisible }) {
  function showOrHidePass() {
      setIsPassVisible(!isPassVisible);
  }

  return (
      <>
      <div>
          <input type="email" placeholder="Email" className="email-input" />
      </div>
      <div>
          <input type={isPassVisible ? "password" : "text"} placeholder="Password" className="password-input" />
          <button onClick={showOrHidePass} className="show-hide-btn">
          {isPassVisible ? "Show" : "Hide"}
          </button>
      </div>
      <button className="login-btn">Login</button>
      <button className="singup-btn">Sing up</button>
      </>
  );
}