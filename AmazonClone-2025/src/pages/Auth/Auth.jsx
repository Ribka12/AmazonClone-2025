import { useContext, useState } from "react";
import styles from "./Auth.module.css";
import amazon from "./../../assets/img/amazon2.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { auth } from "./../../Utility/firebase";
import { context } from "../../Utility/Reducer";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { style } from "@mui/system";
import { ClipLoader } from "react-spinners";

export default function SignIn() {
  const navigate = useNavigate();
  const navloc = useLocation();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState({
    signin: false,
    createacc: false,
  });
  const { state, dispatch } = useContext(context);

  function authandler(e) {
    e.preventDefault();
    if (e.target.name === "signin") {
      setLoading({ ...loading, signin: true });
      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({ type: "ADD_USER", user: userInfo.user });
          setLoading({ ...loading, signin: false });
          navigate(navloc.state?.rdt ? navloc.state?.rdt : "/");
        })
        .catch((err) => {
          setError(err.message);
          setLoading({ ...loading, signin: false });
        });
    } else {
      setLoading({ ...loading, createacc: true });
      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({ type: "ADD_USER", user: userInfo.user });
          setLoading({ ...loading, createacc: false });
          navigate(navloc.state?.rdt ? navloc.state?.rdt : "/");
        })
        .catch((err) => {
          setError(err.message);
          setLoading({ ...loading, createacc: false });
        });
    }
  }

  return (
    <div className={styles.page}>
      <Link to="/" className={styles.brand}>
        <img src={amazon} alt="amazon" />
      </Link>
      <div className={styles.card}>
        {/* Optional enhancement */}

        <h2 className={styles.title}>Sign in</h2>
        <h5
          style={{
            textAlign: "center",
            color: "red",
            fontWeight: "bold",
            fontSize: "14px",
          }}
        >
          {navloc.state?.message}
        </h5>

        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <label>Password</label>
        <div className={styles["password-box"]}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <span
            className={styles.eye}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        <button
          type="submit"
          className={styles["signin-btn"]}
          name="signin"
          onClick={(e) => authandler(e)}
        >
          {loading.signin ? <ClipLoader color="#fff" size={25} /> : "Sign In"}
        </button>

        <p className={styles.terms}>
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
          Sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>

        <div className={styles.divider}>
          <span>New to Amazon?</span>
        </div>

        <button
          className={styles["create-btn"]}
          name="createaccount"
          onClick={(e) => authandler(e)}
        >
          {loading.createacc ? (
            <ClipLoader size={25} color="#000" />
          ) : (
            "Create your Amazon Account"
          )}
        </button>
      </div>

      {error && (
        <div className={styles["error-inline"]}>
          <span className={styles["error-dot"]}>!</span>
          <span className={styles["error-message"]}>{error}</span>
        </div>
      )}
    </div>
  );
}
