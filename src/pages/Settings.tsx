import { useDispatch, useSelector } from "react-redux";
import { choiceSize, FrameSize, TypeState} from "../app/store/store";
import { useRef } from "react";

export default function Settings() {
    const select_ref = useRef<HTMLSelectElement>(null);
    const dispatch = useDispatch();
    
    const setFrameSizeInStore = ()=>{
        const value = select_ref.current?.value as FrameSize;
        dispatch(choiceSize(value));

    }

    return (
            <div>
                <h1>Размер поля: </h1>
                <select ref={select_ref} onChange={setFrameSizeInStore}>
                    <option value={"2x2"}>2x2</option>
                    <option value={"4x4"}>4x4</option>
                    <option value={"8x8"}>8x8</option>
                </select>
            </div>
    );
}