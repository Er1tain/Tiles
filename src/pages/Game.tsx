import { useNavigate } from "react-router";
import useLocalStorage from "../app/hooks/useLocalStorage";
import GameFrame from "../widgets/GameFrame/GameFrame";
import { Container, SettingsButton } from "../styles/pages/Game";

export default function Game() {
    const nav = useNavigate();
    const goToSettings = ()=>nav('/');

    //Количество строк/столбцов(их кол-во одинаково)
    const frame_size: number|null = Number(useLocalStorage('frame_size')?.[0]);;
    
    return (
            <Container>
                <h1>Игра</h1>
                <SettingsButton onClick={goToSettings}>К настройкам</SettingsButton>
                <GameFrame size={frame_size ? frame_size : 2}/>
            </Container>
    );
}