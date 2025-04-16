import axios from "axios";
import { useNavigate } from "react-router-dom"
import qs from 'qs';

export default function LoginSimulation() {
    const navigate = useNavigate();

    function handleLogin(e: any) {
        e.preventDefault();

        const data = {
            username: "alice",
            password: "pass123"
        };

        axios.post("http://localhost:8080/api/auth/user/login", qs.stringify(data), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }, 
            withCredentials: true
        })
            .then(result => {
                console.log("login successful", result.data)
                navigate("/");
            })
            .catch(err => {
                console.error(err);
                alert("login failed. check console.");
            })
    }

    return(
        <div>
            <button onClick={handleLogin}>Login as Alice</button>
        </div>
    )
}