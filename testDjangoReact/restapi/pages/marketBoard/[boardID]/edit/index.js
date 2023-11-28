import MarketBoardWrite from "@/src/marketBoard/write/MarketBoardWrite-container";


export default function MarketBoardEditPage(){

    return(
        <MarketBoardWrite isEdit = {true}/>  //data를 props를 통해서 넘겨줌
    )
}