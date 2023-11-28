import { DogImg, Wrapper } from "./OpenapiList-styles";


export default function OpenapiListUI(props) {
  console.log(props.imgUrls);
  return (
    <Wrapper>
      <div>
        {props.imgUrls.map((el, index) => (
          <>
            <DogImg key={el} src={el} />
          </>
        ))}
      </div>
    </Wrapper>
  );
}
