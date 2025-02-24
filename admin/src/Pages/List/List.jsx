import React, { useEffect, useState, useCallback } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";

function List() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isRemoving, setIsRemoving] = useState(null); // Track which item is being removed
  const URL = "http://localhost:4000";

  const fetchList = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${URL}/api/food/list`);
      if (data.success) {
        setList(data.data);
      }
    } catch (error) {
      console.error("Something went wrong on getting food list", error);
      toast.error("Something went wrong on getting food list");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  async function remove(_id) {
    setIsRemoving(_id);
    try {
      await axios.post(`${URL}/api/food/remove/`, { _id });
      setList((prev) => prev.filter((item) => item._id !== _id));
      toast.success("Item removed successfully");
    } catch (error) {
      console.error("Error removing item", error);
      toast.error("Failed to remove item");
    } finally {
      setIsRemoving(null);
    }
  }

  return (
    <div className="list add flex-col">
      <p className="list-title">All Food List</p>

      {loading ? (
        <p className="loading-text">Loading food list...</p>
      ) : (
        <div className="list-table">
          <div className="list-table-format title">
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Action</b>
          </div>
          {list.length > 0 ? (
            list.map((item) => (
              <div className="list-table-format" key={item._id}>
                <img src={`${URL}/images/${item.image}`} alt={item.name} />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>${item.price}</p>
                <p
                  onClick={() => !isRemoving && remove(item._id)}
                  style={{
                    cursor: isRemoving ? "not-allowed" : "pointer",
                    color: "red",
                    opacity: isRemoving === item._id ? 0.5 : 1,
                  }}
                >
                  {isRemoving === item._id ? "Removing..." : "X"}
                </p>
              </div>
            ))
          ) : (
            <p className="no-items-text">No food items available.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default List;
