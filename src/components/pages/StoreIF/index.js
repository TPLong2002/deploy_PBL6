import { useSelector, useDispatch } from "react-redux";
import { changeHL, changeDC, changeEmail } from "./IFSlice";

function App() {
  const IFReducer = useSelector((state) => state.changeIF);
  const dispatch = useDispatch();
  const IFs = [
    { Name: "HotLine", action: changeHL, value: IFReducer.HL },
    { Name: "Địa chỉ", action: changeDC, value: IFReducer.DC },
    { Name: "Email", action: changeEmail, value: IFReducer.Email },
  ];
  return (
    <div className="flex flex-col space-y-2">
      {IFs.map((IF, index) => (
        <div className="flex items-center" key={index}>
          <label className="w-1/4">{IF.Name}</label>
          <input
            type="text"
            id="first_name"
            value={IF.value}
            onChange={(event) => dispatch(IF.action(event.target.value))}
            className="w-3/4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="..."
            required
          ></input>
        </div>
      ))}
      <div className="mt-auto text-center">
        <button
          type="submit"
          className="bg-blue-500 mb-8 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          SAVE
        </button>
      </div>
    </div>
  );
}

export default App;
