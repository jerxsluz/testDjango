import {useState} from "react";

export default function CommentItem(props){
    const [isEdit, setIsEdit] = useState(false)

    const onClickEdit = () => {
        setIsEdit(true)
    }

   /* return(
        <div>
            {isEdit === false? (
                <div>
                    <span>작성자</span>
                    <span style={{margin:"10px"}}>{props.el.content}</span>
                    <button onClick={onClickEdit}>수정하기</button>
                </div>
                ): (
                    <input type="text" key={props.el.boardID}/>
                )}
        </div>
    )*/

    return(
        <div>
                <span>작성자</span>
                <span style={{margin:"10px"}}>{props.el.comment}</span>
                <button onClick={onClickEdit}>수정하기</button>
        </div>
    )
}