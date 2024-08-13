import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import React from "react";
import { getReq,postReq} from "../../services/reqClient";
import TextField from "@mui/material/TextField";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";
type EditUserProps = {
  editUser: boolean;
  userId: string;
  setEditUser: React.Dispatch<React.SetStateAction<boolean>>;
  setLoadUserData: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditUserInfo: React.FC<EditUserProps> = ({
  editUser,
  userId,
  setEditUser,
  setLoadUserData,
}) => {
  let [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState({}) as any;
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const saveEditedUser = async (userId:string) => {
    const res = await postReq(`/api/updateUser/${userId}`, {
      name: username!=""?username:user.name,
      email: email!=""?email:user.email,
      phone_number: phoneNumber!=""?phoneNumber:user.phone_number,
      address: address!=""?address:user.address,
      role: role!=""?role:user.role,
    });
    if (res.status === 200) {
      const res_json = await res.json();
      toast.success("Update Success");
      closeModal();
    }
    if(res.status === 500){
      toast.error("Email already exists");
    }
    setLoadUserData(true);
    
  }

  useEffect(() => {
    const fetchData = async () => {
      const userData = await getReq(`/api/getUserInfo/${userId}`);
      setUser(userData.user);
    };

    fetchData();
    // toast.loading("Loading User Information", { autoClose: 300 });
    setTimeout(() => {
      if (editUser) {
        openModal();
        setEditUser(false);
      }
    }, 300);
  }, [editUser]);

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
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    <div className="flex flex-row justify-between pb-3">
                      <p className = "pt-2">Edit User Information</p>
                      <Button variant="contained" onClick = {()=>saveEditedUser(userId)}>Save</Button>
                    </div>
                  </Dialog.Title>
                  <div className="flex flex-col gap-5 pt-3">
                    <TextField
                      id="outlined-helperText"
                      label="Username"
                      defaultValue={user?.name}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                      id="outlined-helperText"
                      label="Email"
                      defaultValue={user?.email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                      id="outlined-helperText"
                      label="Phone Number"
                      defaultValue={user?.phone_number}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <TextField
                      id="outlined-helperText"
                      label="Address"
                      defaultValue={user?.address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                    <TextField
                      id="outlined-helperText"
                      label="Role"
                      defaultValue={user?.role}
                      onChange={(e) => setRole(e.target.value)}
                    />
                    <TextField
                      id="outlined-helperText"
                      label="Provider"
                      defaultValue={user?.provider}
                      InputProps={{
                        readOnly: true,
                      }}
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
export default EditUserInfo;
