
import React, {useEffect} from 'react';
import {useState} from "react";
import axios from "axios";
import {useRouter} from "next/router";
import { Flex, Input } from 'antd';
const { TextArea } = Input;
export default function BoardCommentWrite(){
    const router = useRouter()
    const {boardID} = router.query

   /* const [inputs, setInputs] = useState({
        comment:"",
    })*/

    const [comment, setComment] = useState("")
    //const [datetime, setDatetime] = useState(null)

    const onChangeComment = (event) => {
        setComment(event.target.value)

    }





   const onClickSubmit = async () => {
        const result = await axios.post(`http://127.0.0.1:8000/board/${boardID}/`, {
            comment: comment,
            userID: 1,
            boardID: boardID,
        })
            .then(function (response) {
                console.log(response.data.boardID);
                alert("댓글 등록이 정상적으로 완료되었습니다!")
                setComment("")




            })
            .catch(function (error) {
                console.log(error);
            });
    }








        return(
            <>
                 작성자<br/>
                    <TextArea
                        showCount
                        maxLength={100}
                        onChange={onChangeComment}
                        placeholder="댓글을 작성해주세요"
                        style={{
                            height: 200,
                            resize: 'none',
                            width: 800,
                        }}
                    />
           {/*   내용: <input type="text" id= "comment" onChange={onChangeComment}/>*/}
                <button onClick={onClickSubmit}>작성하기</button>
            </>


        )



}