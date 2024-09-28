interface IGameFrame {
    size: number    //2, 4, 8 - 2x2 4x4 8x8
}

export default function GameFrame({size}: IGameFrame) {
    return (
        <div style={{width: size * 100, height: size * 100, backgroundColor: "gray"}}>

        </div>
    );
}