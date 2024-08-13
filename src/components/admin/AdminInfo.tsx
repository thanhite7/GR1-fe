import React, { useEffect } from "react";
import {
  Button,
  DatePicker,
  Form,
  Input,
} from "antd";
import { getReq,postReq } from "../../services/reqClient";
import { useState } from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
const { RangePicker } = DatePicker;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};
type AdminInfoProps = {
  setState: React.Dispatch<React.SetStateAction<string>>;
};
export default function AdminInfo({setState}: AdminInfoProps): JSX.Element {

    const [user,setUser] = useState({}) as any
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [phoneNumber,setPhoneNumber] = useState("");
    const [address,setAddress] = useState("");
    const [reload,setReload] = useState(true);

    const saveUserInfo = async () => {
      console.log(name,email,phoneNumber,address);

      if(name === "" && email === "" && phoneNumber === "" && address === ""){
        toast.success("No changes made");
      }
      else{
        const res = await postReq(`/api/updateUser/${user.id}`, {
          name: name!=""?name:user.name,
          email:  email!="" ?email:user.email,
          phone_number:  phoneNumber!=""?phoneNumber:user.phone_number,
          address: address!="" ?address:user.address,
        });
        console.log(res)
        if(res.status === 200){
          const res_json = await res.json();
          Cookies.set("auth_token", res_json.jwt_token);
          toast.success("Update Success");
        }
          else{
            toast.error("Update Failed");
          }
      }

      setState("close");
      setReload(true)
    }
    useEffect(()=>{
        const fetchData = async () => {
            const user = await getReq("/api/profile/me");
            console.log(user.userInfo);
            setUser(user.userInfo);
        }
        fetchData()
        setReload(false)
    },[reload==true])
  return (
    <Form {...formItemLayout} variant="filled" className="max-w-[600] pt-5">
      <Form.Item
        label="Username"
        name="Input1"
        rules={[{ message: `${user.name}` }]}
      >
        <Input placeholder={`${user.name}`} onChange={e=>setName(e.target.value)}/>
      </Form.Item>

      <Form.Item
        label="Email"
        name="Input2"
        rules={[{ message: `${user.email}` }]}
      >
        <Input placeholder={`${user.email}`} onChange={e=>setEmail(e.target.value)}/>
      </Form.Item>

      <Form.Item
        label="Phone "
        name="Input3"
        rules={[{ message: `${user.role}` }]}
      >
        <Input placeholder={`${user.phone_number}`} onChange={e=>setPhoneNumber(e.target.value)}/>
      </Form.Item>

      <Form.Item
        label="Address"
        name="Input4"
        rules={[{ message: `${user.role}` }]}
      >
        <Input placeholder={`${user.address}`} onChange={e=>setAddress(e.target.value)}/>
      </Form.Item>

      <Form.Item
        label="Role"
        rules={[{ message: `${user.email}` }]}
      >
        {`${user.role}`}
      </Form.Item>

      <Form.Item
        label="Provider"
        rules={[{ message: `${user.email}` }]}
      >
        {`${user.provider}`}
      </Form.Item>

      <Form.Item wrapperCol={{  }} className = "flex justify-center">
        <Button type="primary" htmlType="submit" onClick = {()=>saveUserInfo()}>
          Save
        </Button>
      </Form.Item>
    </Form>
  );
}

