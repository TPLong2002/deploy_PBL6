import { Link } from "react-router-dom";
function TopProducts({ products }) {
  return (
    <div className="mt-5 overflow-y-auto scrollbar-hide max-h-[30rem]">
      <table className="border-2 rounded-md shadow-md ">
        <thead className="bg-gray-100">
          <tr>
            <td>Name</td>
            <td>Số lượng</td>
          </tr>
        </thead>
        <tbody>
          {products.map((item, index) => (
            <tr key={index}>
              <td>
                <Link
                  to={{
                    pathname: "/product/editproduct",
                    search: `?id=${item.id}`,
                  }}
                >
                  {item.name}
                </Link>{" "}
              </td>
              <td>{item.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TopProducts;
