import BoardCommentListUIItem from "./BoardCommentList-presenterItem";
import InfiniteScroll from "react-infinite-scroller";

export default function BoardCommentListUI(props){
  return (
    <InfiniteScroll pageStart={0} loadMore={props.onLoadMore} hasMore={true}>
      {props.data?.fetchBoardComments.map((el) => (
        <BoardCommentListUIItem key={el._id} el={el} />
      )) ?? <></>}    {/*undefined이면 <></> 이걸 보여줘*/}
    </InfiniteScroll>
  );
}
