import useLocalStorage from "../app/hooks/useLocalStorage";
import GameFrame from "../widgets/GameFrame";

export default function Game() {
    //Количество строк/столбцов(их кол-во одинаково)
    const frame_size = Number(useLocalStorage('frame_size')[0]);

    return (
            <div>
                <h1>Игра</h1>
                <GameFrame size={frame_size}/>
            </div>
    );
}