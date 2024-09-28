import { Provider } from "react-redux"
import { store } from "../app/store/store";

export default function Settings() {
    return (
        <Provider store={store}>
            <div>
                <h1>Размер поля: </h1>
                <select>
                    <option>2x2</option>
                    <option>4x4</option>
                    <option>8x8</option>
                </select>
            </div>
        </Provider>
    );
}