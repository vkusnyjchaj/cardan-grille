import { createBrowserRouter } from "react-router-dom";
import Home from "./views/Home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: Home(),
  }
]);

export default router;