import styled from "styled-components"

interface IMessageAboutNewRound {
    text: string
    color_text: string
}

export default function MessageAboutNewRound({text, color_text}: IMessageAboutNewRound) {
    const Window = styled.div`
        position: absolute;
        width: 100%;
        height: 100%;

        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.3);
    `

    const Message = styled.p`
        color: ${color_text};
    `

    return (
        <Window>
            <Message>{text}</Message>
        </Window>
    );

    
}