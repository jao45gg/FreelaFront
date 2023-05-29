import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function SignUpPage() {

  const navigate = useNavigate();

  useEffect(() => {

    let token = localStorage.getItem("token");
    token = JSON.parse(token);
    if (token?.token) navigate("/home");

  });

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");

  function signUp(e) {

    e.preventDefault();

    axios.post(`${process.env.REACT_APP_API_URL}/signup`, {
      name: name,
      email: email,
      password: password,
      confirmPassword: password1
    })
      .then(() => navigate("/"))
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
    <SingUpContainer>
      <Header>FomeBook</Header>
      <form onSubmit={signUp}>
        <input placeholder="Nome" type="text" required value={name} onChange={e => setName(e.target.value)} />
        <input placeholder="E-mail" type="email" required value={email} onChange={e => setEmail(e.target.value)} />
        <input placeholder="Senha" type="password" autoComplete="new-password" required value={password} onChange={e => setPassword(e.target.value)} />
        <input placeholder="Confirme a senha" type="password" autoComplete="new-password" required value={password1} onChange={e => setPassword1(e.target.value)} />
        <button>Cadastrar</button>
      </form>

      <Link to={"/"}>
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
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
