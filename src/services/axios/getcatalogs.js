import axios from "axios";

const catalog = axios
  .get("http://api.shopiec.shop/api/itemgroups")
  .then((res) => {
    // Trả về mảng các giá trị của cột "name"
    const names = res.data.map((item) => ({
      id: item.id,
      name: item.name,
      image: item.image,
    }));

    // Hoặc nếu bạn muốn lưu trữ cả đối tượng item cũng như tên
    // const items = res.data.map((item) => ({
    //   name: item.name,
    //   otherProperty: item.otherProperty,
    // }));

    return names; // hoặc return items;
  });
export default catalog;
