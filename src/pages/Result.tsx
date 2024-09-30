import { useSelector } from "react-redux";
import { TypeState } from "../app/store/store";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { BackButton, Container, Paragraph } from "../styles/pages/Result";

export default function Result() {
    const results = useSelector(state => state) as TypeState;

    const nav = useNavigate();
    useEffect(()=>{
        if (results.moves.length == 0) nav('/');
    }, [])

    const goToMain = ()=>nav('/');

    return (
        <Container>
            <BackButton onClick={goToMain}>На главную</BackButton>
            <h1>Результаты: </h1>
            <Paragraph>Размер поля: {results.frame_size}</Paragraph>
            <Paragraph>Количество раундов: {results.current_round}</Paragraph>
            <div>
                {results.moves.map((move, i)=>{
                    return <Paragraph>{i+1}. {move[1]} : {move[2]} : {move.result ? "Успех" : "Неудача"}</Paragraph>
                })}
            </div>
        </Container>
    );
}