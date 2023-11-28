import * as S from "./MarketBoardWrite-styles"


export default function CommunityWriteUI(props) {
  return (
    <>
      <S.Wrapper>
       {/* <S.Title>{props.isEdit ? "게시글 수정" : "게시글 등록"}</S.Title>*/}
        <S.Title>게시글 등록</S.Title>
        <S.InputWrapper>
          <S.Label>제목</S.Label>
          <S.Subject
            type="text"
            placeholder="제목을 작성해주세요."
            onChange={props.onChangeTitle}
            /*defaultValue={props.data?.fetchBoard.title}*/
          />
          <S.Error>{props.titleError}</S.Error>
        </S.InputWrapper>


        <S.InputWrapper>
          <S.Label>내용</S.Label>
          <S.Contents
            placeholder="내용을 작성해주세요."
            onChange={props.onChangeContents}
           /* defaultValue={props.data?.fetchBoard.contents}*/
          />
          <S.Error>{props.contentsError}</S.Error>
        </S.InputWrapper>


        <S.ButtonWrapper>
       {/*   <S.SubmitButton
            onClick={props.isEdit ? props.onClickUpdate : props.onClickSubmit}
            isActive={props.isEdit ? true : props.isActive}
          >
            {props.isEdit ? "수정하기" : "등록하기"}
          </S.SubmitButton>*/}
          <S.SubmitButton onClick={props.onClickSubmit}>등록하기</S.SubmitButton>
        </S.ButtonWrapper>
      </S.Wrapper>
    </>
  );
}
