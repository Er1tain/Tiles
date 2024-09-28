import { Provider } from "react-redux";
import { store } from "../app/store/store";

export default function Game() {
    return (
        <Provider store={store}>
            <div>

            </div>
        </Provider>
    );
}