import axios from "axios";
import { useEffect, useState } from "react";
import OpenapiListUI from "./OpenapiList-presenter";

export default function OpenapiList(){
  const [imgUrls, setImgUrls] = useState([]);

  //useEffect 밖에서 api를 요청하게 되면 무한루프에 빠짐

  useEffect(() => {
    const getImg = async () => {
      // [1, 1, 1, 1, 1, 1, 1, 1, 1]
      new Array(9).fill(1).forEach(async (_) => {
        const result = await axios.get(
          "https://dog.ceo/api/breeds/image/random"
        );
        //기존 거 가지고 와서(...prev) 그리고 지금 받은 데이터(result.data.message)를 합쳐서 배열에 !
        setImgUrls((prev) => [...prev, result.data.message]);
      });
    };
    void getImg();
  }, []);

  return <OpenapiListUI imgUrls={imgUrls} />;
}
