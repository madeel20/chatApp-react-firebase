import React,{useState,useEffect} from "react";
import "./login.styles.scss";
import { Link } from "react-router-dom";
import { useToasts } from 'react-toast-notifications'
import firebase from 'firebase';
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [focused, setFocus] = useState("");
  const { addToast } = useToasts()
  useEffect(()=>{
    setError('');
  },[email,password])
  useEffect(() => {
    if(error!==""){
    addToast(error, {
        appearance: 'error',
        autoDismiss: true,
      });
    }
}, [error]);
  const handleSubmit = (e) => {
      e.preventDefault();
    if (email === "" || password === "") {
      setError("Fill all the fields!");
      return;
    }
    setLoading(true);
    firebase.auth().signInWithEmailAndPassword(email,password).then(res=>{
      setLoading(false);
    }).catch(err=>{
      console.log(err)
      setLoading(false);
      setError(err.message);
    })
  };
  return (
    <div className="outer">
      <div className="inner">
        <form onSubmit={handleSubmit}>
          <h3>Log in</h3>
          <hr />
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={e=>setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={e=>setPassword(e.target.value)}
            />
          </div>


          <button type="submit" className="btn btn-dark btn-lg btn-block">
            Sign in
          </button>
          <p className="forgot-password text-right">
            New Member ? <Link to='/sign-up' className="signup">Signup</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
