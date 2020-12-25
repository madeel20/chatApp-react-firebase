import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications';
import './login.styles.scss'
import {auth} from '../firebase/index'
export default function SignUp() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [focused, setFocus] = useState("");
    const { addToast } = useToasts()
    useEffect(()=>{
      setError('');
    },[email,password])
    
    const handleSubmit = (e) => {
        e.preventDefault();
      if (email === "" || password === "") {
        setError("Fill all the fields!");
        return;
      }
      setLoading(true);
      auth.createUserWithEmailAndPassword(email,password).then(res=>{
        setLoading(false);
      }).catch(err=>{
        setError(err.message)
        setLoading(false);
      })
    };
    useEffect(() => {
        if(error!==""){
            addToast(error, {
                appearance: 'error',
                autoDismiss: true,
              });
            }
    }, [error]);
    return (
        <div className="outer">
      <div className="inner">
        <form onSubmit={handleSubmit}>
        <h3>Register</h3>

        <div className="form-group">
            <label>First name</label>
            <input type="text" className="form-control" placeholder="Full Name" value={name} onChange={e=>setName(e.target.value)} />
        </div>

        {/* <div className="form-group">
            <label>Last name</label>
            <input type="text" className="form-control" placeholder="Last name" />
        </div> */}

        <div className="form-group">
            <label>Email</label>
            <input type="email" className="form-control" placeholder="Enter email"  value={email} onChange={e=>setEmail(e.target.value)}/>
        </div>

        <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" placeholder="Enter password" value={password} onChange={e=>setPassword(e.target.value)} />
        </div>

        <button type="submit" className="btn btn-dark btn-lg btn-block">Register</button>
        <p className="forgot-password text-right">
            Already registered <Link to="/">log in?</Link>
        </p>
    </form>
    </div></div>
    )
}
