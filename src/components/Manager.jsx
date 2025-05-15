import React, { useEffect } from "react";
import { useRef, useState } from "react";
import { MdContentCopy } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { AiTwotoneDelete } from "react-icons/ai";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setForm] = useState({ website: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const copyText = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.info("Copied to clipboard!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      })
      .catch(() => {
        toast.error("Failed to copy!");
      });
  };

  const showPassword = () => {
    if (ref.current.src.includes("icons/eyecross.png")) {
      ref.current.src = "icons/eye.png";
      passwordRef.current.type = "text";
    } else {
      ref.current.src = "icons/eyecross.png";
      passwordRef.current.type = "password";
    }
  };

  const savePassword = () => {
    // console.log(form)
    if (
      form.website.length > 3 &&
      form.username.length > 3 &&
      form.password.length > 3
    ) {
      setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
      localStorage.setItem(
        "passwords",
        JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
      );
      setForm({ website: "", username: "", password: "" });
      // console.log(passwordArray)
      toast.success("Saved successfully!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const editPassword = (id) => {
    console.log("editing with id", id);
    setForm(passwordArray.filter((item) => item.id === id)[0]);
    setPasswordArray(passwordArray.filter((item) => item.id !== id));
    toast.success("Edited successfully!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const deletePassword = (id) => {
    let c = confirm("Are you sure want to delete?");
    if (c) {
      setPasswordArray(passwordArray.filter((item) => item.id !== id));
      localStorage.setItem(
        "passwords",
        JSON.stringify(passwordArray.filter((item) => item.id !== id))
      );
      toast.error("Password deleted!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <div className="bg-zinc-900 w-full h-screen">
        <div className="container mx-auto max-w-4xl">
          <div className="text-white flex flex-col p-10">
            <h1 className="font-bold text-3xl text-center">
              &lt;Pass<span className="text-sky-600">OP</span>/&gt;
            </h1>
            <p className="text-center text-xl">Your own Password Manager</p>

            <div className="flex flex-col py-10 items-center">
              {/* input 1 */}
              <input
                value={form.website}
                onChange={handleChange}
                type="text"
                name="website"
                className="w-full bg-white text-black rounded outline-none py-2 px-2"
                placeholder="Enter website URL"
              />
              <div className="flex w-full py-10 gap-5">
                {/* input 2 */}
                <input
                  value={form.username}
                  onChange={handleChange}
                  type="text"
                  name="username"
                  className="bg-white text-black rounded outline-none py-2 px-2 w-full"
                  placeholder="Enter username"
                />
                <div className="relative w-full">
                  {/* input 3 */}
                  <input
                    ref={passwordRef}
                    value={form.password}
                    onChange={handleChange}
                    type="password"
                    name="password"
                    className="bg-white text-black rounded outline-none py-2 px-2 w-full pr-12"
                    placeholder="Enter password"
                  />
                  <span
                    onClick={showPassword}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  >
                    <img
                      ref={ref}
                      className="cursor-pointer"
                      width={24}
                      src="icons/eyecross.png"
                      alt="eye"
                    />
                  </span>
                </div>
              </div>
              <button
                onClick={savePassword}
                className="w-fit cursor-pointer px-4 py-2 bg-sky-600 rounded font-semibold hover:bg-sky-500"
              >
                Save 👍
              </button>
            </div>

            <div className="passwords">
              <h2 className="text-2xl font-bold py-5">Your Passwords</h2>

              {passwordArray.length === 0 && <div>No passwords to show</div>}
              {passwordArray.length != 0 && (
                <table className="table-auto w-full rounded overflow-hidden">
                  <thead className="bg-sky-600">
                    <tr>
                      <th className="py-2 px-4">Website</th>
                      <th className="py-2 px-4">Username</th>
                      <th className="py-2 px-4">Password</th>
                      <th className="py-2 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-500/50">
                    {passwordArray.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td className="flex items-center justify-between py-2 px-4 min-w-[200px] overflow-hidden">
                            <span className="truncate">{item.website}</span>
                            <MdContentCopy
                              className="cursor-pointer ml-2 flex-shrink-0"
                              onClick={() => copyText(item.website)}
                            />
                          </td>

                          <td className="py-2 px-4 min-w-[150px] max-w-[250px] overflow-hidden text-center">
                            <span className="truncate flex items-center justify-center">
                              {item.username}{" "}
                              <MdContentCopy
                                className="cursor-pointer ml-2 flex-shrink-0"
                                onClick={() => copyText(item.username)}
                              />
                            </span>
                          </td>
                          <td className="py-2 px-4 min-w-[150px] max-w-[250px] overflow-hidden text-center">
                            <span className="truncate flex items-center justify-center">
                              {item.password}{" "}
                              <MdContentCopy
                                className="cursor-pointer ml-2 flex-shrink-0"
                                onClick={() => copyText(item.password)}
                              />
                            </span>
                          </td>

                          <td className="py-2 px-4 min-w-[150px] max-w-[250px] overflow-hidden text-center">
                            <span className="truncate flex justify-around">
                              <FiEdit
                                onClick={() => {
                                  editPassword(item.id);
                                }}
                                className="cursor-pointer"
                              />
                              <AiTwotoneDelete
                                onClick={() => {
                                  deletePassword(item.id);
                                }}
                                className="cursor-pointer"
                              />
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Manager;
