import "./register.scss";
import { Link } from "react-router-dom";
import { useAppContext } from "../../Context/AppContext";
function Register() {
  const { setRegisterData, registerUser, userRegisterData } = useAppContext();
  const handleChange = (e) => {
    setRegisterData({
      ...userRegisterData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call registerUser function with form data
    registerUser();
  };
  return (
    <div className="register">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Create an Account</h1>
          <input
            name="username"
            type="text"
            placeholder="Username"
            onChange={handleChange}
          />
          <input
            name="email"
            type="text"
            placeholder="Email"
            onChange={handleChange}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
          />
          <button>Register</button>
          <Link to="/login">Do you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Register;
