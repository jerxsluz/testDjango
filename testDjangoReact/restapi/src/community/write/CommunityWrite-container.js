import { useState } from "react";
import axios from "axios";
//import CommunityWriteUI from "./CommunityWrite-presenter"
import {useRouter} from "next/router";
import * as S from "@/src/community/write/CommunityWrite-styles";


export default function CommunityWrite(props){
    const router = useRouter()
    const [reqData, setReqData] = useState([])

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [boardID, setBoardID] =  useState(0)

    const [isActive, setIsActive] = useState(false);
    const [titleError, setTitleError] = useState("");
    const [contentError, setContentError] = useState("");


    const onChangeTitle = (event) => {
            setTitle(event.target.value)

           if (event.target.value !== "") {
               setTitleError("");
           }

           if (
               event.target.value !== "" &&
               content !== ""
           ) {
               setIsActive(true);
           } else {
               setIsActive(false);
           }
       };


    const onChangeContent = (event) => {
            setContent(event.target.value);

            if (event.target.value !== "") {
                setContentError("");
            }

            if (
                title !== "" &&
                event.target.value !== ""
            ) {
                setIsActive(true);
            } else {
                setIsActive(false);
            }
        };


    const onClickSubmit = async () => {

        if (title === "") {
            setTitleError("제목을 입력해주세요.");
        }
        if (content === "") {
            setContentError("내용을 입력해주세요.");
        }

        if (title !== "" && content !== "") {

             const result = await axios.post("http://127.0.0.1:8000/board/", {
                    title: title,
                    content: content,
                    boardType: 1,
                    userID: 1,

                })
                 .then(function (response) {
                    console.log(response.data.boardID);
                     router.push(`/community/${response.data.boardID}`);


                    alert("게시물 등록이 정상적으로 완료되었습니다!")


                })
                .catch(function (error) {
                    console.log(error);
                });




        }


    }

    const onClickUpdate = async () => {

        const {boardID} = router.query

        if (
            title === "" &&
            content === ""
        ) {
            alert("수정한 내용이 없습니다.");
            return;
        }

        const updateBoardInput = {};   //빈 객체
        if (title !== "") updateBoardInput.title = title;
        if (content !== "") updateBoardInput.content = content;


        if (title !== "" && content !== "") {

            const result = await axios.put(`http://127.0.0.1:8000/board/${boardID}/`, {
                boardType: 1,
                userID: 1,
                title: updateBoardInput.title,
                content:updateBoardInput.content,
            })
                .then(function (response) {
                    console.log(response.data.boardID);
                    router.push(`/community/${response.data.boardID}/`);

                    alert("게시물 수정이 정상적으로 완료되었습니다!")


                })
                .catch(function (error) {
                    console.log(error);
                });

        }


    }

    return (
        <>
            <S.Wrapper>
                <S.Title>{props.isEdit ? "게시글 수정" : "게시글 등록"}</S.Title>
                <S.InputWrapper>
                    <S.Label>제목</S.Label>
                    <S.Subject
                        type="text"
                        placeholder="제목을 작성해주세요."
                        onChange={onChangeTitle}
                        /*defaultValue={props.data?.fetchBoard.title}*/
                    />
                    <S.Error>{titleError}</S.Error>
                </S.InputWrapper>


                <S.InputWrapper>
                    <S.Label>내용</S.Label>
                    <S.Contents
                        placeholder="내용을 작성해주세요."
                        onChange={onChangeContent}
                        /* defaultValue={props.data?.fetchBoard.contents}*/
                    />
                    <S.Error>{contentError}</S.Error>
                </S.InputWrapper>


                <S.ButtonWrapper>
                    <S.SubmitButton
            onClick={props.isEdit ? onClickUpdate : onClickSubmit}
            isActive={props.isEdit ? true : isActive}
          >
            {props.isEdit ? "수정하기" : "등록하기"}
          </S.SubmitButton>
                </S.ButtonWrapper>
            </S.Wrapper>
        </>

    )



}