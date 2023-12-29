import { Link, useLocation } from "react-router-dom";
import "../../../../App.css";
import Avt from "../../../../img/avt/360_F_227450952_KQCMShHPOPebUXklULsKsROk5AvN6H1H.jpg";
import { Paths } from "./Paths";

function App() {
  const admin = localStorage.getItem("name");
  const currentPath = useLocation().pathname;
  const isCurrentPath = (path) => {
    return currentPath === path || currentPath.startsWith(path);
  };
  return (
    <div className="p-4">
      <div className=" bg-white flex-col border-2 border-rose-200 rounded-md">
        <div className="justify-center flex">
          <img src={Avt} alt="" className="w-20"></img>
        </div>
        <div className="justify-center flex mt-5">{admin}</div>
      </div>
      {Paths.map((path, index) => {
        return (
          <Link
            to={path.to}
            key={index}
            className={`block p-2 my-4 hover:bg-yellow-400 bg-gray-100 ${
              isCurrentPath(path.to)
                ? "bg-yellow-400 scale-105 shadow-lg"
                : "bg-gray-100"
            } transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-105 duration-300 hover:shadow-lg`}
          >
            {path.page}
          </Link>
        );
      })}
    </div>
  );
}

export default App;
