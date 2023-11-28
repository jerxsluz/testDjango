import type { ChangeEvent } from "react";
import { gql, useMutation } from "@apollo/client";
import type { IMutation, IMutationUploadFileArgs } from "../../../src/commons/types/generated/types";
import { useRef, useState } from "react";
import { file, is } from "@babel/types";
import { findAllInRenderedTree } from "react-dom/test-utils";
import { CheckValidtionFile } from "../../../src/commons/libraries/validation";



const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!){
    uploadFile(file:$file){
      url
    }
  }
`

export default function ImageUploadPage():JSX.Element{

    const[imageUrl, setimageUrl] = useState("")
    const fileRef = useRef<HTMLInputElement>(null)

    const [uploadFile] = useMutation<Pick<IMutation,"uploadFile">,IMutationUploadFileArgs>(UPLOAD_FILE)

    const onChangeFile = async (event:ChangeEvent<HTMLInputElement>):Promise<void> => {
        const file = event.target.files?.[0]   //왜 file's'?, 배열? -> 이미지 여러 개 들어올 수도 있으니까 저렇게 둔다
        // event.target.files가 있으면 '?' 0번째 거를 가지고 와 줘

        console.log(file)                      //<input type="file" onChange={onChangeFile} multiple/>

        const isValid = CheckValidtionFile(file);

        if(!isValid) return;

        const result = await uploadFile({ variables:{ file:file }})

        console.log(result.data?.uploadFile.url)
        setimageUrl(result.data?.uploadFile.url ?? "")

    }

    const onClickImage = ():void => {
        fileRef.current?.click();


    }


    return(
        <>
            <div style={{width:"100px", height:"100px", backgroundColor:"grey"}} onClick={onClickImage}>이미지 선택</div>
            <input style={{display:"none"}} type="file" onChange={onChangeFile} ref={fileRef} accept="image/jpeg, image/png"/>
            <img src={`https://storage.googleapis.com/${imageUrl}`} />
        </>

    )
}