import CommunityWrite from "@/src/community/write/CommunityWrite-container";




export default function CommunityEditPage(){

    return(
        <CommunityWrite isEdit = {true}/>  //data를 props를 통해서 넘겨줌
    )
}