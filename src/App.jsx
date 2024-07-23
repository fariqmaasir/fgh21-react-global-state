import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaPen, FaTrash } from "react-icons/fa6";
import { add, edt, dlt } from "./redux/reducers/table";

function App() {
  const url = "https://jsonplaceholder.typicode.com/users";
  const userTable = useSelector((state) => state.table.userTable);
  console.log(userTable);
  const dispatch = useDispatch();
  const [showBtn, setShowBtn] = React.useState(false);
  async function getData() {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const json = await response.json();
      json.map((item) =>
        dispatch(
          add({
            id: item.id,
            name: item.name,
            email: item.email,
          })
        )
      );
      setShowBtn(!showBtn);
    } catch (error) {
      console.error(error.message);
    }
  }
  console.log("ini user Table", userTable);
  const [showDel, setShowDel] = React.useState(false);
  const [showEdit, setShowEdit] = React.useState(false);
  const [nums, setNums] = React.useState(0);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  function del(num) {
    setNums(num);
    setShowDel(!showDel);
  }
  function edit(num) {
    setName();
    const table = userTable.filter((items) => {
      if (items.id === num) {
        return true;
      }
    });
    setNums(num);
    setName(table[0].name);
    setEmail(table[0].email);
    setShowEdit(!showEdit);
  }
  function yes() {
    dispatch(dlt(nums));
    setShowDel(!showDel);
  }
  function no() {
    setShowDel(!showDel);
  }
  function editData(event) {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const n = nums - 1;
    dispatch(dlt(n));
    dispatch(
      edt({
        id: nums,
        name,
        email,
      })
    );
    setShowEdit(!showEdit);
  }
  return (
    <div>
      <div className="flex flex-col justify-center h-screen items-center relative">
        <div className={showBtn ? "hidden" : ""}>
          <button
            type="button"
            onClick={getData}
            className="bg-blue-500 p-2 rounded-3xl font-semibold"
          >
            click me
          </button>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {userTable.map((item, index) => (
                <tr id={item.id}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>
                    <span className="flex gap-2">
                      <span
                        className="bg-blue-500 p-1 rounded"
                        onClick={() => edit(item.id)}
                      >
                        <button type="button">
                          <FaPen />
                        </button>
                      </span>
                      <span
                        className="bg-blue-500 p-1 rounded"
                        onClick={() => del(index)}
                      >
                        <button type="button">
                          <FaTrash />
                        </button>
                      </span>
                    </span>
                  </td>
                </tr>
              ))}
              {/* <tr>
                <td>Fariq</td>
                <td>fariq@mail.com</td>
                <td>
                  <span className="flex gap-2">
                    <span
                      className="bg-blue-500 p-1 rounded-full"
                      onClick={edit}
                    >
                      <button type="button">
                        <FaPen />
                      </button>
                    </span>
                    <span
                      className="bg-blue-500 p-1 rounded-full"
                      onClick={del}
                    >
                      <button type="button">
                        <FaTrash />
                      </button>
                    </span>
                  </span>
                </td>
              </tr> */}
            </tbody>
          </table>
        </div>
      </div>
      <div className={showEdit ? "" : "hidden"}>
        <div className="absolute top-0 bg-black/50 w-full h-full">
          <div className="flex items center justify-center h-screen ">
            <form
              onSubmit={editData}
              className="bg-white flex flex-col gap-5 justify-center my-40 px-20 rounded-3xl"
            >
              <div className="text-xl font-semibold">Edit Profile</div>
              <div className="border py-2 px-5 rounded-xl">
                <input
                  type="text"
                  name="name"
                  className="outline-none"
                  placeholder={name}
                ></input>
              </div>
              <div className="border py-2 px-5 rounded-xl">
                <input
                  type="text"
                  name="email"
                  className="outline-none"
                  placeholder={email}
                ></input>
              </div>
              <div className="bg-blue-500 py-2 px-5 rounded-xl flex items-center justify-center ">
                <button type="submit" className="font-semibold text-white">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className={showDel ? "" : "hidden"}>
        <div className="absolute top-0 bg-black/50 w-full h-full">
          <div className="flex items center justify-center h-screen ">
            <form
              onSubmit={editData}
              className="bg-white flex flex-col gap-5 justify-center my-40 px-20 rounded-3xl"
            >
              <div className="text-xl font-semibold">Edit Profile</div>
              <div className="flex gap-5">
                <div className="border py-2 px-5 rounded-xl bg-red-500">
                  <button type="button" onClick={yes}>
                    Yes :"
                  </button>
                </div>
                <div className="border py-2 px-5 rounded-xl bg-green-500">
                  <button type="button" onClick={no}>
                    No :D
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
