import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

export default function HomePage({ updateApp }) {

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
            <PostsContainer >
                {user?.posts?.map((u, index) =>
                    <Posts index={index}>
                        <img src={u.photo} alt="post" />
                        <div className="textpost">
                            <h1>{`${u.likesCount} curtiram sua foto !`}</h1>
                            <h1>{`${dayjs(u.postedAt).format("DD/MM/YYYY")} às ${dayjs(u.postedAt).format("HH:MM")}`}</h1>
                        </div>
                        <div className="description">{u.description}</div>
                    </Posts>)}
            </PostsContainer>
            <Button onClick={() => navigate("/newPost")}>+</Button>
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

const Posts = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 20px;
    background-color: gainsboro;
    margin-bottom: 5dvh;
    img {
        width: 100%;
        height: 30dvh;
    }
    .textpost {
        display: flex;
        justify-content: space-between;
        height: 3dvh;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .description {
        height: 6dvh;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    height: 50dvh;
    border: 10px;
    border-color: red;
`;

const PostsContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #fff;
    border-radius: 5px;
    width: 70dvw;
    height: 50dvh;
    padding: 20px;
    overflow-y: scroll;
    margin-bottom: 2dvh;
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

const Button = styled.h1`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 75px;
    height: 75px;
    background-color: #f5f5f5;
    border-radius: 50%;
    position: fixed;
    bottom: 3%;
    right: 3%;
    font-size: 2dvh;
    cursor: pointer;
`;