import React, { useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { toast } from "react-toastify";
import TextField from "@mui/material/TextField";
import { postReq } from "../../services/reqClient";
import Button from "@mui/material/Button";
import PlusIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
type AddUserProps = {
  addUser: boolean;
  setAddUser: React.Dispatch<React.SetStateAction<boolean>>;
    setLoadUserData: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddUser: React.FC<AddUserProps> = ({ addUser, setAddUser,setLoadUserData }) => {
    const navigate = useNavigate();
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
    setAddUser(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  useEffect(() => {
    if (addUser) {
      openModal();
    }
  }, [!addUser]);
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    phone_number: "",
    address: "",
    role:""
  });
  const [err, setErr] = useState("");
  const setUserName = (name: any) => {
    setUserInfo({ ...userInfo, name: name });
  };
  const setPhoneNumber = (phone_number: any) => {
    setUserInfo({ ...userInfo, phone_number: phone_number });
  };
  const setAddress = (address: any) => {
    setUserInfo({ ...userInfo, address: address });
  };
  const setRole = (role: any) => {
    setUserInfo({ ...userInfo, role: role });
  }
  const setEmail = (email: any) => {
    setUserInfo({ ...userInfo, email: email });
  };
  const setPassword = (password: any) => {
    setUserInfo({ ...userInfo, password: password });
  };
  const setConfirmPassword = (confirmPassword: any) => {
    setUserInfo({ ...userInfo, confirmPassword: confirmPassword });
  };
  const addNewUser = async () => {
    console.log(userInfo);
    setErr("");
    if (!userInfo.email) {
      setErr("email");
      toast.error("Please provide email");
      return;
    }
    if (!userInfo.name) {
      setErr("name");
      toast.error("Please provide username");
      return;
    }
    if(!userInfo.role){
        setErr("role");
        toast.error("Please provide role");
        return;
    }

    if (!userInfo.password) {
      setErr("password");
      toast.error("Please provide password");
      return;
    }
    if (
      !userInfo.confirmPassword ||
      userInfo.password !== userInfo.confirmPassword
    ) {
      setErr("cpd");
      toast.error("Password does not match");
      return;
    }
    const res = await postReq("/api/auth/register", {
      email: userInfo.email,
      password: userInfo.password,
      name: userInfo.name,
      phone_number: userInfo.phone_number,
      address: userInfo.address,
        role:userInfo.role
    });
    if (res.status === 401) {
      toast.error("Email already exists");
    } else {
      toast.success("Register Success");
    }
    closeModal();
    setLoadUserData(true);
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg flex flex-row font-medium leading-6 text-gray-900 justify-between pb-3 align-middle"
                  >
                    <p className="pt-2">Add New User</p>
                    <Button
                      variant="contained"
                      startIcon={<PlusIcon />}
                      onClick={() => {
                        addNewUser();
                      }}
                    >
                      Add
                    </Button>
                  </Dialog.Title>
                  <div className="gap-5 flex flex-col pt-3">
                    <TextField
                      id="outlined-password-input"
                      label="Email"
                      type="email"
                      error={err.includes("email")}
                      className="w-full"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                      id="outlined-password-input"
                      label="Username"
                      type="name"
                      error={err.includes("name")}
                      className="w-full"
                      onChange={(e) => setUserName(e.target.value)}
                    />
                    <TextField
                      id="outlined-password-input"
                      label="Phone Number"
                      type="name"
                      className="w-full"
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <TextField
                      id="outlined-password-input"
                      label="Address"
                      type="name"
                      className="w-full"
                      onChange={(e) => setAddress(e.target.value)}
                    />
                    <TextField
                      id="outlined-password-input"
                      label="Role"
                      type="name"
                      className="w-full"
                      error={err.includes("role")}
                      onChange={(e) => setRole(e.target.value)}
                    />

                    <TextField
                      id="outlined-password-input"
                      label="Password"
                      type="password"
                      error={err.includes("password")}
                      className="w-full"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <TextField
                      id="outlined-password-input"
                      label="Confirm Password"
                      type="password"
                      error={err.includes("cpd")}
                      className="w-full"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default AddUser;
