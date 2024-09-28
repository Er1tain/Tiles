import { useNavigate } from "react-router";
import useLocalStorage from "../app/hooks/useLocalStorage";
import GameFrame from "../widgets/GameFrame";

export default function Game() {
    //Количество строк/столбцов(их кол-во одинаково)
    const frame_size = Number(useLocalStorage('frame_size')[0]);
    const nav = useNavigate();
    const goToSettings = ()=>nav('/');

    return (
            <div>
                <h1>Игра</h1>
                <GameFrame size={frame_size}/>
                <button onClick={goToSettings}>К настройкам</button>
            </div>
    );
}