import axios from "axios";
import React, { useState, useEffect } from "react";
import defaultPtofile from "../Media/profile.png";
import { Link, useNavigate } from "react-router-dom";
import { setCookie, getCookie } from "../Cookie/cookieConfigure.js";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { auth } from "../Cookie/auth";


const API = "http://localhost:5500/createuser/login";

function Login() {
    const navigate = useNavigate();
    const [isLoadding, setIsLoadding] = useState(false);
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    useEffect(() => {
        const token = getCookie("token");
        const user = auth(token);
        if (user) {
            navigate("/chatpage");
        }
    }, [navigate]);

    const handlePasswordInput = (e) => {
        e.preventDefault();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoadding(true);
        const credentials = { phone, password };
        try {
            const responce = await axios.get(API, {
                params: credentials,
            });
            setCookie("token", responce.data.token);
            setIsLoadding(false);
            navigate("/chatpage");
        } catch (error) {
            setIsLoadding(false);
            console.log(error);
        }
    };

    return (
        <form id="login" onSubmit={handleSubmit} encType="multipart/from-data">
            <div className="profileDiv">
                <img
                    src={defaultPtofile}
                    alt="profile"
                    width={100}
                    className="profile"
                />
            </div>
            <div className="phone inputField">
                <input
                    type="number"
                    value={phone}
                    placeholder="*phone"
                    autoComplete="phone no"
                    required
                    onChange={(e) => {
                        setPhone(e.target.value);
                    }}
                />
            </div>
            <div className="password inputField">
                <input
                    type={isPasswordVisible ? "text" : "password"}
                    value={password}
                    placeholder="*password"
                    autoComplete="password"
                    required
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />
                <button onClick={handlePasswordInput}>
                    {isPasswordVisible ? (
                        <FaEyeSlash
                            id="hidePassword"
                            onClick={() => setIsPasswordVisible(false)}
                        />
                    ) : (
                        <FaEye
                            id="showPassword"
                            onClick={() => setIsPasswordVisible(true)}
                        />
                    )}
                </button>
            </div>
            <button type="submit">
                {isLoadding ? "Loadding..." : "login"}
            </button>
            <p className="info">
                did't have account <Link to="/signin">signin</Link>
            </p>
        </form>
    );
}

export default Login;
