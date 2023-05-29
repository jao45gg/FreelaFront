import styled from "styled-components";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function SignInPage({ setUpdate }) {

    const navigate = useNavigate();
    let token = localStorage.getItem("token");
    token = JSON.parse(token);

    useEffect(() => {

    });

    const [photo, setPhoto] = useState("");
    const [description, setDescription] = useState("");

    function signIn(e) {

        e.preventDefault();

        axios.post(`${process.env.REACT_APP_API_URL}/newPost`, {
            photo,
            description
        }, {
            headers: { Authorization: `Bearer ${token.token}` }
        },)
            .then(res => {
                setUpdate(1);
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
                <Title>Novo Post</Title>
                <input placeholder="foto" type="url" required value={photo} onChange={e => setPhoto(e.target.value)} />
                <input placeholder="descrição" type="text" autoComplete="new-password" required value={description} onChange={e => setDescription(e.target.value)} />
                <button>Criar Post</button>
            </form>

            <Link to={"/home"}>
                Cancelar
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

const Title = styled.header`
    font-family: 'Roboto', sans-serif;
    font-weight: 600;
    font-size: 4dvh;
    color: #fff;
    margin-bottom: 4dvh;
`;