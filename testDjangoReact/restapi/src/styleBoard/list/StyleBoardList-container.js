import { useRouter } from "next/router";
import {useEffect, useState, useCallback} from "react";
import axios from "axios";
import * as S from "@/src/community/list/CommunityList-styles";
import {FireFilledIcon, Searchbar, SearchbarInput} from "@/src/community/searchbars/01/Searchbars01-styles";
import _ from "lodash";
import{v4 as uuidv4} from "uuid"
import {getDate} from "../../commons/libraries/utils"

const SECRET = "!@#$";


export default function StyleBoardList() {


    const router = useRouter();



    const [reqData, setReqData] = useState([])
    const [keyword, setKeyword] = useState("")





    useEffect(()=>{
        console.log("마운트가 완료되었디!")
        axios
            .get("http://127.0.0.1:8000/board/")
            .then((response) => {
                setReqData([...response.data])


                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });


    },[])



    const printValue = useCallback(
        _.debounce((value) => console.log(value), 500),
        []
    );

    const handleChange = (event) => {
        printValue(event.target.value);
        setKeyword(event.target.value);
    };




    const onClickMoveToBoardNew = () => {
    router.push("/styleBoard/new");
  }

  let eventData ;

  const onClickMoveToBoardDetail = (event) => {
    router.push(`/styleBoard/${event.target.id}`);
    console.log(event.target.id)


  };


  const onChangeKeyword = (value) => {
    setKeyword(value);
  };


    return (
        <S.Wrapper>
            <Searchbar>
                <FireFilledIcon />
                <SearchbarInput
                    placeholder="검색어를 입력해 주세요."
                    onChange={handleChange}
                />
            </Searchbar>
            스타일보드

            <S.TableTop />
            <S.Row>
                <S.ColumnHeaderBasic>ID</S.ColumnHeaderBasic>
                <S.ColumnHeaderTitle>제목</S.ColumnHeaderTitle>
                {/*<S.ColumnHeaderBasic>작성자</S.ColumnHeaderBasic>*/}
                <S.ColumnHeaderBasic>날짜</S.ColumnHeaderBasic>
            </S.Row>


            {reqData.filter(el => el.title.includes(keyword)).map(el => (
                    <S.Row key={el.boardID}>

                        <S.ColumnBasic>{el.boardID}</S.ColumnBasic>
                        <S.ColumnTitle id={el.boardID}  props = {eventData} onClick={onClickMoveToBoardDetail} >

                            {el.title
                                .replaceAll(keyword, `${SECRET}${keyword}${SECRET}`)
                                .split(SECRET)
                                .map((el, index) => (
                                    <S.TextToken key={uuidv4()} isMatched={keyword === el}>
                                        {el}
                                    </S.TextToken>
                                ))}
                        </S.ColumnTitle>
                       <S.ColumnBasic>{getDate(el.datetime)}</S.ColumnBasic>
                    </S.Row>
                ))}


            <S.TableBottom />
            <S.Footer>
                {/*  <Paginations01 refetch={props.refetch} count={props.count} />*/}
                <S.Button onClick={onClickMoveToBoardNew}>
                    {/*<S.PencilIcon src="/images/board/list/write.png" />*/}
                    게시물 등록하기
                </S.Button>
            </S.Footer>
        </S.Wrapper>
    );

}
