import { Fragment } from "react";
import { MenuItem, Wrapper } from "./LayoutNavigation-styles";


const NAVIGATION_MENUS = [
  { name: "여러 스타일들", page: "/openapis" },
  { name: "community", page: "/boards" },
  { name: "style", page: "/style" },
  { name: "sale", page: "/market" },
];


/*배열로 맵을 돌리는 구조로 리팩토링 완료 !!*/
export default function LayoutNavigationUI(props){
  return (
    <Wrapper>
      {NAVIGATION_MENUS.map((el) => (
        <Fragment key={el.page}>
          <MenuItem id={el.page} onClick={props.onClickMenu}>
            {el.name}
          </MenuItem>
        </Fragment>
      ))}
    </Wrapper>
  );
}
