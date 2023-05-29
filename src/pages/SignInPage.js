import styled from "styled-components";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function SignInPage() {

    const navigate = useNavigate();

    useEffect(() => {

        const token = localStorage.getItem("token");
        if (token) navigate("/home");

    });

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function signIn(e) {

        e.preventDefault();

        axios.post(`${process.env.REACT_APP_API_URL}/signin`, {
            email: email,
            password: password
        })
            .then(res => {
                localStorage.setItem("token", res.data);
                navigate("/home");
            })
            .catch(err => {
                if (Array.isArray(err.response.data)) {
                    err.response.data.forEach(element => {
                        alert(element);
                    });
                } else {
                    alert(err.response.data);
                }
            })
    }

    return (
        <SingInContainer>
            <Header>FomeBook</Header>
            <form onSubmit={signIn}>
                <input placeholder="E-mail" type="email" required value={email} onChange={e => setEmail(e.target.value)} />
                <input placeholder="Senha" type="password" autoComplete="new-password" required value={password} onChange={e => setPassword(e.target.value)} />
                <button>Entrar</button>
            </form>

            <Link to={"/cadastro"}>
                Primeira vez? Cadastre-se!
            </Link>
        </SingInContainer>
    )
}

const SingInContainer = styled.section`
    font-family: 'Roboto', sans-serif;
    height: 100dvh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: orange;
`;

const Header = styled.header`
    font-family: 'Roboto', sans-serif;
    font-weight: 600;
    font-size: 7dvh;
    color: #fff;
`;