import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"

export default function FollowsPage({ updateApp }) {

    const navigate = useNavigate();
    let token = localStorage.getItem("token");
    token = JSON.parse(token);

    const [user, setUser] = useState({});

    useEffect(() => {
        if (!token?.token) return navigate("/");

        axios.get(`${process.env.REACT_APP_API_URL}/user/${token.userId}`, {
            headers: { Authorization: `Bearer ${token.token}` }
        })
            .then(res => setUser(res.data))
            .catch(err => {
                if (Array.isArray(err.response.data)) {
                    err.response.data.forEach(element => {
                        alert(element);
                    });
                } else {
                    alert(err.response.data);
                }
            });
    }, [updateApp, navigate, token.token, token.userId])

    return (
        <Container>
            <Header>FomeBook</Header>
            <UserContainer>
                <img src={user.photo} alt="user" />
                <TextContainer>
                    <div className="text">
                        <h1>{user.name}</h1>
                        <h2>{user?.biography}</h2>
                    </div>
                    <div className="buttons">
                        <button>Ver seguidores</button>
                        <button>Ver quem eu sigo</button>
                    </div>
                </TextContainer>
            </UserContainer>
        </Container>
    );
}

const Header = styled.header`
    font-family: 'Roboto', sans-serif;
    font-weight: 600;
    font-size: 7dvh;
    color: #fff;
    margin-top: 2dvh;
`;

const Container = styled.section`
    font-family: 'Roboto', sans-serif;
    height: 100dvh;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    background-color: orange;
`;

const UserContainer = styled.div`
    background-color: #fff;
    width: 70dvw;
    height: 30dvh;
    img {
        width: 64px;
        height: 64px;
    }
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3dvh;
    border-radius: 5px;
`;

const TextContainer = styled.div`
    margin-left: 6dvw;
    width: 45dvw;
    height: 20dvh;
    background-color: #f5f5f5;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1.5dvh;
    border-radius: 5px;
    .text {
        h1 {
            font-size: 1.5dvh;
            padding-left: 3px;
            text-align: left;
            height: 3dvh;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        h2{
            font-size: 1.3dvh;
            margin-top: 1.5dvh;
            height: 6dvh;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

    }
    .buttons {
        display: flex;
        button {
            width: 20dvw;
            height: 5dvh;
            margin-right: 2.5dvw;
            font-size: 1.4dvh;
        }
    }
`;
