import axios from "axios";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
//import CommentItem from "@/src/boardComment/list/CommentItem";
import React from 'react';
import { Card, Space } from 'antd';

export default function BoardCommentList(){
    const router = useRouter();

    const [reqData, setReqData] = useState([])


    const {boardID} = router.query


    useEffect(()=>{
        console.log("마운트가 완료되었디!")
        axios
            .get(`http://127.0.0.1:8000/board/${boardID}/comment/`)
            .then((response) => {
                setReqData([...response.data])

                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });


    },[])





   return(
        <div>
            {reqData?.map((el)=>(
                <div>
                    <Card title="작성자" size="small">
                        <p style={{margin:"10px"}}>{el.comment}</p>
                    </Card>
                    <button>삭제하기</button>
                </div>
            ))}
        </div>



   )
}