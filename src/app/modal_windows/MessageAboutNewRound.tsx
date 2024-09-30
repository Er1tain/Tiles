import styled from "styled-components"
import { ChoiceTilesType } from "../../widgets/GameFrame/types"
import { useSelector } from "react-redux"
import { TypeState } from "../store/store"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { useTilesContext } from "../hooks/useTilesContext"

interface IMessageAboutNewRound {
    text: string
    color_text: string
    
    choice_tiles?: ChoiceTilesType

}

const Window = styled.div`
        left: 0;
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

    //Получаем доступ к контексту, который хранит список ссылок на функции состояний плиток
    const [state_tiles_context, setStateTilesContext] = useTilesContext()as [{ref_tile: any, changeColorTile: any}[],
    Dispatch<SetStateAction<{ref_tile: any, changeColorTile: any}[]>>];

    //Делаем кликабельными пару выбранных ранее плиток разного цвета + сброс цвета
    useEffect(()=>{
        state_tiles_context.map((pair_reftile_setTileColor)=>{
            const ref_tile = pair_reftile_setTileColor.ref_tile;
            const setTileColor = pair_reftile_setTileColor.changeColorTile;

            if (ref_tile.current.value == choice_tiles?.first_tiles.coords || ref_tile.current.value == choice_tiles?.second_tiles.coords) {
                setTileColor('');
            }
        })

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