import { lazy } from "preact/compat";
const Todo = lazy(() => import("./Todo/Todo"));
const JsonServer = lazy(
  () => import("./Json-server/Json")
);
const Home = lazy(() => import("./Home"));
import Navbar from "./Navbar/Navbar";
import Loading from "./Common/Loading";
export {
  Todo,
  Loading,
  JsonServer,
  Navbar,
  Home,
};
