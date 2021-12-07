import ReactDOM from "react-dom";
import Welcome from "./welcome.js";
import App from "./app.js";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import * as immutableState from "redux-immutable-state-invariant";
import reducer from "./redux/reducer.js";
import { composeWithDevTools } from "redux-devtools-extension";
import { init } from "./socket.js";

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(immutableState.default()))
);

const elem = (
    <Provider store={store}>
        <App />
    </Provider>
);

fetch("/user/id.json")
    .then((response) => response.json())
    .then((data) => {
        if (!data.userId) {
            ReactDOM.render(<Welcome />, document.querySelector("main"));
        } else {
            // at this point the user definitely logged in, so we want to create a socket
            // by calling the imported init function with our redux store as an argument
            init(store);
            ReactDOM.render(elem, document.querySelector("main"));
        }
    });
