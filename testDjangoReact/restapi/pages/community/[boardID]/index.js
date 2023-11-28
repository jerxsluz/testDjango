import CommunityDetail from "@/src/community/detail/CommunityDetail-container";
import BoardCommentWrite from "../../../src/boardComment/write/boardCommentWrite";
import BoardCommentList from "../../../src/boardComment/list/boardCommentList";
import {useState} from "react";
import {useRouter} from "next/router";




export default function CommunityDetailPage(){
    return (
        <>
            <CommunityDetail/>
            <BoardCommentWrite/>
            <BoardCommentList/>
        </>

    )



}