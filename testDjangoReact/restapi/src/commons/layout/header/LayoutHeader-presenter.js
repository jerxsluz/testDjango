import {
  InnerButton,
  InnerLogo,
  InnerWrapper, MOFYLogo,
  Wrapper,
} from "./LayoutHeader-styles";


export default function LayoutHeaderUI(props){
  return (
    <Wrapper>
      <InnerWrapper>
        <MOFYLogo onClick={props.onClickLogo} src="/images/layout/mofy.png/"/>
        <div>
          <InnerButton onClick={props.onClickMoveToLogin}>로그인</InnerButton>
          <InnerButton>회원가입</InnerButton>
        </div>
      </InnerWrapper>
    </Wrapper>
  );
}
