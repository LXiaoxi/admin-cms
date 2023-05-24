type getPageData = (page?: number, pageSize?: number, otherInfo?: any) => void;
type query = (item: any) => void;
type reset = (item?: any) => void;
function usePageSearch(getPageData: getPageData, query?: query, reset?: reset) {
  // 查询
  function handleQuery(searchForm: any) {
    getPageData(0, 10, searchForm);
  }
  function handleReset() {
    if (reset) reset();
    getPageData();
  }
  return {
    handleQuery,
    handleReset,
  };
}

export default usePageSearch;
