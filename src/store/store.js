import { createStore } from "redux";
import Reducer from "../reducers/reducer";

export default function configureStore(initalState) {
  const store = createStore(Reducer, initalState);
  return store;
}
