import "../../../../App.css";
import Img from "../../../../img/logo/logo.png";
function App() {
  return (
    <div className="bg-[#dd0105] flex justify-center text-center p-3">
      <img
        className="h-[1.8rem] object-top w-[6rem]"
        src={Img}
        alt="Logo"
      ></img>
    </div>
  );
}

export default App;
