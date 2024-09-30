import { useSelector } from "react-redux";
import { TypeState } from "../app/store/store";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function Result() {
    const results = useSelector(state => state) as TypeState;

    const nav = useNavigate();
    useEffect(()=>{
        if (results.moves.length == 0) nav('/');
    }, [])

    return (
        <div>
            <h1>Результаты: </h1>
            <p>Размер поля: {results.frame_size}</p>
            <p>Количество раундов: {results.current_round}</p>
            <div>
                {results.moves.map((move, i)=>{
                    return <p>{i+1}. {move[1]} : {move[2]} : {move.result ? "Успех" : "Неудача"}</p>
                })}
            </div>
        </div>
    );
}