import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Loading from "./Loading";
import TableFoodRow from "./TableFoodRow";

const ShowFood = ({ changeApi, setChangeApi }) => {
  const [foods, setFoods] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [limit, setLimit] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getFoods = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:4000/food?_page=${currentPage + 1}&_limit=${Number(
            limit
          )}`
        );
        setFoods(response.data.result);
        setPageCount(response.data.pageCount);
      } catch (err) {
        alert(err.message);
      } finally {
        setLoading(false);
      }
    };
    getFoods();
  }, [currentPage, changeApi, limit]);

  const handlePageChange = (data) => {
    setCurrentPage(data.selected);
  };

  const handleToggleSelectAll = (e) => {
    const { checked } = e.target;
    let checkboxes = document.querySelectorAll("input[name^=food-]");
    for (let i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = checked;
    }

    const selectedCheckboxes = [];
    [...checkboxes].forEach((checkbox) => {
      if (checkbox.checked) selectedCheckboxes.push(checkbox);
    });

    setSelectedFoods(selectedCheckboxes);
  };

  // delete selected foods
  const deleteFoods = () => {
    const selectedFoodsId = selectedFoods.map((v) => {
      return {
        _id: v.id.split("food-").join(""),
      };
    });
    try {
      selectedFoodsId.forEach(async (v) => {
        await axios.delete(`http://localhost:4000/food/${v._id}`);
      });
      alert("Successfully Deleted food");
    } catch (err) {
      alert(err.message);
    } finally {
      setChangeApi((prevState) => !prevState);
      setSelectedFoods([]);
    }
  };

  return (
    <div className="showFood">
      <h1 className="text-center display-3 mb-3">All Foods</h1>
      <div className="d-flex mb-3 justify-content-between">
        <div>
          <input
            type="number"
            name="limit"
            id="limit"
            placeholder="Enter table size"
            className="form-control"
            value={limit}
            onChange={(e) => {
              setLimit(e.target.value);
            }}
          />
        </div>
        <button
          className="btn btn-danger"
          disabled={selectedFoods.length > 0 ? false : true}
          onClick={deleteFoods}
        >
          Delete?
        </button>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className="show-food-table mb-4">
          <table className="table table-striped table-hover table-responsive">
            <thead>
              <tr>
                <th scope="col">
                  <input
                    type="checkbox"
                    name="allFood"
                    onChange={handleToggleSelectAll}
                    checked={
                      selectedFoods.length === Number(limit) ? true : false
                    }
                    className="btn-check"
                    id="btn-check-outlined"
                  />
                  <label
                    className="btn btn-outline-primary"
                    htmlFor="btn-check-outlined"
                  >
                    All
                  </label>
                </th>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Edit?</th>
              </tr>
            </thead>
            <tbody>
              {foods.map((food, index) => (
                <TableFoodRow
                  columnItems={{
                    serial: index + 1,
                    name: food.foodName,
                    price: food.foodPrice,
                    edit: "Edit",
                  }}
                  food={food}
                  currentPage={currentPage}
                  setChangeApi={setChangeApi}
                  limit={limit}
                  key={food._id}
                  setSelectedFoods={setSelectedFoods}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <ReactPaginate
        className="pagination justify-content-center"
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        pageClassName="page-item"
        previousClassName="page-item"
        nextClassName="page-item"
        pageLinkClassName="page-link"
        previousLinkClassName="page-link"
        nextLinkClassName="page-link"
        pageCount={pageCount}
        marginPagesDisplayed={3}
        pageRangeDisplayed={3}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ShowFood;
