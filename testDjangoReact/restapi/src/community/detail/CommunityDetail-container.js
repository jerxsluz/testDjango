import { useRouter } from "next/router";
//import BoardDetailUI from "./CommunityDetail-presenter";
import * as S from "@/src/community/detail/CommunityDetail-styles";
import axios from "axios";
import {useEffect, useState} from "react";
import {getDate} from "../../commons/libraries/utils";
import {searchParamsToUrlQuery} from "next/dist/shared/lib/router/utils/querystring";
import React from 'react';
import { Button} from 'antd';


export default function CommunityDetail() {
    const router = useRouter();

    const {boardID} = router.query

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [datetime, setDatetime] = useState(null)


    useEffect(()=>{

        console.log("불러올게")
        axios
            .get(`http://127.0.0.1:8000/board/${boardID}/`)
            .then((response) => {
                const data = {
                    title: response.data.title,
                    content: response.data.content,
                    datetime: response.data.datetime,
                }

                setTitle(response.data.title)
                setContent(response.data.content)
                setDatetime(response.data.datetime)




            })
            .catch(function (error) {
                console.log(error);
            });


    },[])





    const onClickMoveToBoardEdit = () => {
        router.push(`/community/${boardID}/edit`);

    }


    const onClickBoardDelete = async () => {

        const result = await axios.delete(`http://127.0.0.1:8000/board/${boardID}/`, )

            .then(function (response) {
                console.log(response.data.boardID);
                router.push("/community/");

                alert("게시물 삭제가 정상적으로 완료되었습니다!")


            })
            .catch(function (error) {
                console.log(error);
            });

    }


  /*  const onClickReport = () => {

    }*/






    return (
        <S.Wrapper>
            <S.CardWrapper>
                <S.Header>
                    <S.AvatarWrapper>
                        {/*<S.Avatar src="/images/avatar.png" />*/}
                        <S.Info>
                            {/*<S.Writer>{props.data?.fetchBoard?.writer}</S.Writer>*/}
                            <S.Writer>작성자</S.Writer>
                            <S.CreatedAt>
                              {getDate(datetime)}
                            </S.CreatedAt>
                        </S.Info>
                    </S.AvatarWrapper>
                    <S.IconWrapper>
                        <Button danger>신고하기</Button>
                    </S.IconWrapper>
                </S.Header>
                <S.Body>
                    <S.Title>{title}</S.Title>
                    <S.Contents>{content}</S.Contents>
                </S.Body>
            </S.CardWrapper>
            <S.BottomWrapper>
                <S.Button onClick={() => router.push("/community")}>목록으로</S.Button>
                <S.Button onClick={onClickMoveToBoardEdit}>수정하기</S.Button>
                <S.Button onClick={onClickBoardDelete}>삭제하기</S.Button>
            </S.BottomWrapper>
        </S.Wrapper>
    )
}

