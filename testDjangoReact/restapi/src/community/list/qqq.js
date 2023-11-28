import {gql, useQuery} from "@apollo/client";
import { IQuery, IQueryFetchBoardArgs, IQueryFetchBoardsArgs } from "../../../src/commons/types/generated/types";
import { ChangeEvent, MouseEvent, useState } from "react";
import _ from 'lodash'
import {v4 as uuidv4} from 'uuid'

const FETCH_BOARDS = gql`
    query fetchBoards($page: Int, $search: String){
        fetchBoards(page: $page, search:$search){
            _id
            writer
            title
            contents
        }
    }
`

export default function StaticRoutingMovedPage():JSX.Element{

  const { data, refetch } = useQuery<Pick<IQuery,"fetchBoards">, IQueryFetchBoardsArgs>(FETCH_BOARDS, { variables: { page: 1 } }); //API 요청이 날라감
  const [search, setSearch] = useState("")
  const [keyword, setKeyword] = useState("")




  const onClickPage = (event:MouseEvent<HTMLSpanElement>): void => {
    //검색에서 refetch를 할 때, search 검색어가 refetch에 이미 저장되어 있는 상태이므로 추가로 search 포함하지 않아도 됨
    void refetch({ page: Number(event.currentTarget.id) });

  }

  const getDebounce = _.debounce((value) => {
    refetch({search:value, page:1})
    setKeyword(value)

  }, 500)

  const onChangeSearch = (event:ChangeEvent<HTMLInputElement>):void => {
   /* setSearch(event.currentTarget.value)*/
   getDebounce(event.currentTarget.value)

  }



/*  const onClickSearch = ():void => {
    void refetch({
      search: search,
      page: 1,     //어느 페이지에서 검색을 하더라도 검색 결과는 첫페이지부터 순차적으로 보여줘야 함
    })
  }*/


  return (
    <>

      검색어 입력: <input type="text" onChange={onChangeSearch}/>
    {/*  <button onClick={onClickSearch}>검색하기</button>*/}
      {data?.fetchBoards.map(el => (
        <div key={el._id}>
          <span style={{margin:"10px"}}>{el.title}</span>
          {el.title
            .replaceAll(keyword,`!@#$${keyword}!@#$`)
            .split("!@#$")
            .map(el =>(
            <span key={uuidv4()}
                  style={{color:el === keyword ? "red":"black"}}>
              {el}
            </span>
          ))}
          <span style={{margin:"10px"}}>{el.writer}</span>
        </div>))}