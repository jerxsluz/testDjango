import { useRouter } from "next/router";
//import BoardDetailUI from "./CommunityDetail-presenter";
import * as S from "@/src/community/detail/CommunityDetail-styles";
import axios from "axios";
import {useEffect, useState} from "react";
import {getDate} from "../../commons/libraries/utils";
import { CommentOutlined } from '@ant-design/icons';
import React from 'react';
import { FloatButton , Button, Popover} from 'antd';


export default function MarketBoardDetail() {
    const router = useRouter();

    const {boardID} = router.query

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [datetime, setDatetime] = useState(null)
    const [price, setPrice] = useState(0)
    const [state, setState] = useState(false)
    const [imageURL, setImageURL] = useState(null);
    const [address, setAddress] = useState("")



    useEffect(() => {
        const fetchData = async () => {
            try {
                // 이미지 및 게시물 데이터를 병렬로 불러오기
                const imageResponse = await axios.get(`http://127.0.0.1:8000/board/${boardID}/`)


                // 이미지 URL이 상대 경로로 저장되어 있으므로, 기본 URL과 결합하여 전체 URL 생성
                const baseURL = 'http://127.0.0.1:8000';
                const fullURL = baseURL + imageResponse.data.image;

                // 이미지를 불러오기
                const imageBlobResponse = await axios.get(fullURL, {
                    responseType: 'arraybuffer',
                });

                if (imageBlobResponse.status === 200) {
                    const contentType = imageBlobResponse.headers['content-type'];
                    const blob = new Blob([imageBlobResponse.data], { type: contentType });

                    // Blob 데이터를 URL.createObjectURL을 사용하여 이미지 URL로 변환
                    const objectURL = URL.createObjectURL(blob);
                    setImageURL(objectURL);
                } else {
                    console.error('Failed to fetch image');
                }

                // 게시물 데이터 설정
                setTitle(imageResponse.data.title);
                setContent(imageResponse.data.content);
                setPrice(imageResponse.data.price);
                setState(imageResponse.data.state);
                setDatetime(imageResponse.data.datetime);
                setAddress(imageResponse.data.address)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [boardID]);











    /*  const onClickMoveToBoardEdit = () => {
       if (typeof router.query.boardId !== "string") {
         alert("시스템에 문제가 있습니다.");
         return;
       }*/

    const onClickMoveToBoardEdit = () => {
        router.push(`/marketBoard/${boardID}/edit`);

    }


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
                            <S.Writer>{state? "판매중" : "판매완료"}</S.Writer>
                        </S.Info>
                    </S.AvatarWrapper>
                    <S.IconWrapper>
                        <Popover content={address? address:"사용자가 위치설정을 하지 않았어요"} title="위치">
                            <Button type="primary">여기서 만나요!</Button>
                        </Popover>
                    </S.IconWrapper>
                </S.Header>
                <S.Body>
                    <S.Title>{title}</S.Title>
                    <S.Contents>{price}원</S.Contents>
                    <S.Contents>{content}</S.Contents>
                    <S.ImageWrapper>{imageURL && <S.Image src={imageURL} alt="Fetched" />}</S.ImageWrapper>
                </S.Body>
            </S.CardWrapper>
            <S.BottomWrapper>
                <S.Button onClick={() => router.push("/marketBoard")}>목록으로</S.Button>
                <S.Button onClick={onClickMoveToBoardEdit}>수정하기</S.Button>
                <S.Button>삭제하기</S.Button>
                <FloatButton icon={<CommentOutlined />} />
            </S.BottomWrapper>
        </S.Wrapper>
    )
}

