import {useEffect, useRef, useState} from "react";
import axios from "axios";
import {useRouter} from "next/router";
import * as S from "@/src/community/write/CommunityWrite-styles";
import { Address } from "react-daum-postcode";
import {Modal} from "antd";
import {ImageBox} from "@/src/styleBoard/write/StyleBoardWrite-styles";
import { PlusOutlined } from '@ant-design/icons';
import { Input, Space, Tag, theme, Tooltip } from 'antd';

export default function StyleBoardWrite(props){
    const router = useRouter()
    const [isActive, setIsActive] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [reqData, setReqData] = useState([])

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [boardID, setBoardID] =  useState(0)

    const [titleError, setTitleError] = useState("");
    const [contentError, setContentError] = useState("");
    const [imageError, setImageError] = useState("");



    const [image, setImage] = useState(null)
    const [tags, setTags] = useState("")







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

    const onChangeTag = (event) => {
        setTags(event.target.value)

    }



    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }



    const onClickSubmit = async () => {
        if (title === "") {
            setTitleError("제목을 입력해주세요.");
        }
        if (content === "") {
            setContentError("내용을 입력해주세요.");
        }

        if (!image) {
            alert("사진을업로드하거리")
        }

        if (title !== "" && content !== "" && image) {

            const formData = new FormData();


            formData.append('image', image);
            formData.append('title', title);
            formData.append('content', content);
            formData.append('boardType', 2);
            formData.append('like_num', 0);
            formData.append('userID', 1);

            // 'tags'를 배열로 설정
            const tagsArray = ["안녕", "바보", "하이"];
            tagsArray.forEach((tag, index) => {
                formData.append(`tags[${index}]`, tag);
            });


            const result = await axios.post("http://127.0.0.1:8000/board/", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },

            })
                .then(function (response) {
                    console.log(response.data);
                    alert("게시물 등록이 정상적으로 완료되었습니다!");
                    router.push(`/styleBoard/${response.data.boardID}`);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

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
                      /*  defaultValue={props.data?.fetchBoard.contents}*/
                    />
                    <S.Error>{contentError}</S.Error>
                </S.InputWrapper>
                

                <S.ImageWrapper>
                    <S.Label>사진첨부</S.Label>
               {/*     <S.ImageBox>
                        {fileUrls.map((el, index) => (
                            <Uploads01
                                key={uuidv4()}
                                index={index}
                                fileUrl={el}
                                onChangeFileUrls={onChangeFileUrls}
                            />
                        ))}
                    </S.ImageBox>*/}
                    <input type="file" onChange={handleImageChange} />

                </S.ImageWrapper>

                <input onChange={onChangeTag}/>


                <S.ButtonWrapper>
                    {/*   <S.SubmitButton
            onClick={props.isEdit ? props.onClickUpdate : props.onClickSubmit}
            isActive={props.isEdit ? true : props.isActive}
          >
            {props.isEdit ? "수정하기" : "등록하기"}
          </S.SubmitButton>*/}
                    <S.SubmitButton onClick={onClickSubmit}>등록하기</S.SubmitButton>
                </S.ButtonWrapper>
            </S.Wrapper>
        </>

    )



}
