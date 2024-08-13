import React from "react";
import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";
import { useState } from "react";
import { toast } from "react-toastify";
import { postReq, getReq } from "../../services/reqClient";
type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
  console.log("Success:", values);
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

type ChangePasswordProps = {
  setState: React.Dispatch<React.SetStateAction<string>>;
};
export default function ChangePassword({
  setState,
}: ChangePasswordProps): JSX.Element {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const handleChangePassword = async () => {
    if (oldPassword === "" && newPassword === "") {
      toast.success("Nothing changes");
      setState("close");

    } else {
      const userInfo = await getReq("/api/profile/me");
      const res = await postReq(`/api/changePassword`, {
        userId: userInfo.userInfo.id,
        oldPassword: oldPassword,
        newPassword: newPassword,
      });
      console.log(res);
      if (res.status === 400) {
        toast.error("Old Password is incorrect");
      }
      if (res.status === 200) {
        toast.success("Password Change Success");
      } else {
        toast.error("Password Change Failed");
      }
      setState("close");
    }
    setOldPassword("");
    setNewPassword("");

    
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 15 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      autoComplete="off"
      className="pt-3"
    >
      <Form.Item<FieldType> label="Old Password" name="username">
        <Input.Password onChange={(e) => setOldPassword(e.target.value)} />
      </Form.Item>

      <Form.Item<FieldType> label="New Password" name="password">
        <Input.Password onChange={(e) => setNewPassword(e.target.value)} />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 9, span: 16 }}>
        <Button
          type="primary"
          htmlType="submit"
          onClick={() => handleChangePassword()}
        >
          Save
        </Button>
      </Form.Item>
    </Form>
  );
}
