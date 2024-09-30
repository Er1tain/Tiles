import styled from "styled-components"
import { ChoiceTilesType } from "../../widgets/GameFrame/types"
import { useSelector } from "react-redux"
import { TypeState } from "../store/store"
import { useEffect, useState } from "react"

interface IMessageAboutNewRound {
    text: string
    color_text: string
    
    choice_tiles?: ChoiceTilesType

}

const Window = styled.div`
        top: 0;
        position: absolute;
        width: 100%;
        height: 100%;

        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.4);
`

export default function MessageAboutNewRound({text, color_text, choice_tiles}: IMessageAboutNewRound) {
    //Окно с уведомление активно или нет?
    const [status, setStatus] = useState<"visible"|"hidden">("hidden");

    //Получаем значение для текущего раунда из store
    const current_round: number = useSelector<TypeState>(state => state.current_round) as number;

    //Делаем кликабельными пару выбранных ранее плиток разного цвета + сброс цвета
    useEffect(()=>{
        document.querySelectorAll("button").forEach(tile=>{
            if (tile.className == 'tile' && (tile.value == choice_tiles?.first_tiles.coords || tile.value == choice_tiles?.second_tiles.coords)) {
                tile.style.backgroundColor = '';
                tile.disabled = false;
            }
        });

        //Уведомление о новом раунде
        setStatus("visible");
        setTimeout(()=>setStatus("hidden"), 1000);
    }, [current_round])

    return (
        <Window style={status ? {visibility: status} : {}}>
            <p id="round_message" style={{color: color_text}}>{text} {current_round}</p>
        </Window>
    );

    
}