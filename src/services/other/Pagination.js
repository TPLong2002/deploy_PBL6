import ReactPaginate from "react-paginate";
function Pagination({ handlePageClick, pageCount }) {
  return (
    <ReactPaginate
      nextLabel="next >"
      onPageChange={handlePageClick}
      pageRangeDisplayed={3}
      marginPagesDisplayed={2}
      pageCount={pageCount}
      previousLabel="< previous"
      renderOnZeroPageCount={null}
      containerClassName="flex justify-center p-2"
      pageClassName="rounded p-2"
      activeClassName="bg-blue-500 text-white"
      previousClassName="rounded p-2 bg-gray-300 hover:bg-gray-400"
      nextClassName="rounded p-2 bg-gray-300 hover:bg-gray-400"
    />
  );
}

export default Pagination;
