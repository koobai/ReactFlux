import { Button } from "@arco-design/web-react";
import { IconArrowDown } from "@arco-design/web-react/icon";
import { forwardRef, useContext } from "react";

import useLoadMore from "../../hooks/useLoadMore";
import { ContentContext } from "../ContentContext";
import ArticleCard from "./ArticleCard";
import LoadingCards from "./LoadingCards";
import SearchInput from "./SearchInput";

const ArticleListView = forwardRef(
  ({ loading, handleFilterEntry, handleClickEntryList, cardsRef }, ref) => {
    const { entries, filterStatus, loadMoreUnreadVisible, loadMoreVisible } =
      useContext(ContentContext);

    const { loadingMore, handleLoadMore } = useLoadMore();

    return (
      <div
        className="entry-list"
        ref={ref}
        style={{
          overflowY: "auto",
          padding: "10px 10px 0 10px",
          width: "302px",
          backgroundColor: "var(--color-fill-1)",
          flex: "1",
        }}
      >
        <SearchInput />
        <LoadingCards loading={loading} />
        <div ref={cardsRef}>
          {entries.map((entry) => (
            <ArticleCard
              key={entry.id}
              entry={entry}
              handleClickEntryList={handleClickEntryList}
            />
          ))}
        </div>
        {filterStatus === "all" && loadMoreVisible && (
          <Button
            onClick={handleLoadMore}
            loading={loadingMore}
            long={true}
            style={{ margin: "10px auto", display: "block" }}
          >
            {!loadingMore && <IconArrowDown />}Load more
          </Button>
        )}

        {filterStatus === "unread" && loadMoreUnreadVisible && (
          <Button
            onClick={handleLoadMore}
            loading={loadingMore}
            long={true}
            style={{ margin: "10px auto", display: "block" }}
          >
            {!loadingMore && <IconArrowDown />}Load more
          </Button>
        )}
      </div>
    );
  },
);

export default ArticleListView;