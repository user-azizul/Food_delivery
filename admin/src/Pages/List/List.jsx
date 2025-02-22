import React from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";
function List() {
  const [list, setList] = React.useState([]);
  const URL = "http://localhost:4000";
  async function fetchList() {
    try {
      const { data } = await axios.get(`${URL}/api/food/list`);
      if (data.success) {
        setList(data.data);
      }
    } catch (error) {
      console.log("Something went wrong on getting food list", error);
      toast.error("Something went wrong on getting food list");
    }
  }

  React.useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <p className="list-title">All Food List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item) => (
          <div className="list-table-format" key={item.id}>
            <img src={`${URL}/images/${item.image}`} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{item.price}</p>
            <p>X</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default List;
