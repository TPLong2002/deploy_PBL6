import axios from "axios";

function addProduct(product, token, images) {
  console.log(product, token);
  console.log(product, token);
  axios
    .post("http://api.shopiec.shop/api/items", product, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      console.log(res);
    });
  // images.map((image) =>
  //   axios.post(
  //     "http://api.shopiec.shop/api/imageitems",
  //     { id: product.id, image: image },
  //     {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   )
  // );
}
export default addProduct;
