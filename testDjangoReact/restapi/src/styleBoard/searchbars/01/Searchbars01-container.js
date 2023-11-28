import _ from "lodash";
import {FireFilledIcon, Searchbar, SearchbarInput} from "@/src/community/searchbars/01/Searchbars01-styles";

export default function Searchbars01(props) {
  const getDebounce = _.debounce((value) => {
    props.refetch({ search: value, page: 1 });
    props.refetchBoardsCount({ search: value });
    props.onChangeKeyword(value);
  }, 500);

  const onChangeSearchbar = (event)  => {
    getDebounce(event.target.value);
  };

  return (
      <Searchbar>
        <FireFilledIcon />
        <SearchbarInput
            placeholder="검색어를 입력해 주세요."
            onChange={props.onChangeSearchbar}
        />
      </Searchbar>
  );
  )
}
