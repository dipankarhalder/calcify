import ReactPaginate from "react-paginate";
import {
  HiChevronLeft,
  HiChevronRight,
  HiOutlineDotsHorizontal,
} from "react-icons/hi";

const ThemePagination = ({ totalRecord, handlePageClick }) => {
  return (
    <div className="paginations">
      <ReactPaginate
        breakLabel={<HiOutlineDotsHorizontal />}
        nextLabel={<HiChevronRight />}
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={3}
        pageCount={totalRecord}
        previousLabel={<HiChevronLeft />}
        containerClassName=""
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export default ThemePagination;
