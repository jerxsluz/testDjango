/*
//import { getDate } from "../../../../commons/libraries/utils";
import * as S from "./CommunityList-styles";
//import{v4 as uuidv4} from "uuid"
/!*import Searchbars01 from "../../../../../src/components/commons/searchbars/01/Searchbars01.container";
import Paginations01 from "../../../../components/commons/paginations/01/Paginations01.container";*!/

const SECRET = "!@#$";

export default function CommunityListUI(props){
    return (
        <S.Wrapper>
           {/!* <Searchbars01
                refetch={props.refetch}
                refetchBoardsCount={props.refetchBoardsCount}
                onChangeKeyword={props.onChangeKeyword}
            />*!/}

            <S.TableTop />
            <S.Row>
                <S.ColumnHeaderBasic>ID</S.ColumnHeaderBasic>
                <S.ColumnHeaderTitle>제목</S.ColumnHeaderTitle>
                <S.ColumnHeaderBasic>작성자</S.ColumnHeaderBasic>
                <S.ColumnHeaderBasic>날짜</S.ColumnHeaderBasic>
            </S.Row>

            {props.reqData?.map((el) => (
                <S.Row key={el._id}>
                    <S.ColumnBasic>
                        {String(el._id).slice(-4).toUpperCase()}
                    </S.ColumnBasic>
                   {/!* <S.ColumnTitle id={el._id} onClick={props.onClickMoveToBoardDetail}>
                        {el.title}
                    </S.ColumnTitle>*!/}
                    <S.ColumnBasic>{el.writer}</S.ColumnBasic>
                    {/!*<S.ColumnBasic>{getDate(el.createdAt)}</S.ColumnBasic>*!/}
                    <S.ColumnBasic>{el.update_at}</S.ColumnBasic>
                </S.Row>
            ))}
            <S.TableBottom />
            <S.Footer>
              {/!*  <Paginations01 refetch={props.refetch} count={props.count} />*!/}
                <S.Button onClick={props.onClickMoveToBoardNew}>
                    {/!*<S.PencilIcon src="/images/board/list/write.png" />*!/}
                    게시물 등록하기
                </S.Button>
            </S.Footer>
        </S.Wrapper>
    );
}*/
