import { useDispatch, useSelector } from "react-redux";
import { choiceSize, FrameSize, TypeState} from "../app/store/store";
import { useRef, useState } from "react";

export default function Settings() {
    const select_ref = useRef<HTMLSelectElement>(null);
    const dispatch = useDispatch();
    
    //Кнопка не видна, пока не выбран размер поля
    const [visible_button, setVisible] = useState<any>('hidden');

    const setFrameSizeInStore = ()=>{
        const value = select_ref.current?.value as FrameSize;
        dispatch(choiceSize(value));

        setVisible("visible");
    }

    return (
            <div>
                <h1>Размер поля: </h1>
                <select ref={select_ref} onChange={setFrameSizeInStore}>
                    <option value={"2x2"}>2x2</option>
                    <option value={"4x4"}>4x4</option>
                    <option value={"8x8"}>8x8</option>
                </select>
                <button style={{visibility: visible_button }}>Продолжить</button>
            </div>
    );
}