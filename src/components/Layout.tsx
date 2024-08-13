import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import {
  Button as AntButton,
  Layout,
  Menu as AntMenu,
  theme,
} from "antd";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UserTable from "./admin/UserTable";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import SlackOutlined from "@ant-design/icons";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import AdminInfo from "./admin/AdminInfo";
import ChangePassword from "./admin/ChangePassword";
import Button from "@mui/material/Button";
import PlusIcon from "@mui/icons-material/Add";
import AddUser from "./admin/AddUser";
import EditUserInfo from "./admin/EditUserInfo";
const { Header, Sider, Content } = Layout;

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const App: React.FC = () => {
  const [value, setValue] = React.useState(0);
  const [addUser, setAddUser] = useState(false);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const [loadUserData, setLoadUserData] = useState(false);
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [editUser, setEditUser] = useState(false);

  const [searchKeyword, setSearchKeyword] = useState("");

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logout = () => {
    Cookies.remove("auth_token");
    toast.success("Logout Success");
    navigate("/login");
  };
  let [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState("open");
  const [userId, setUserId] = useState("");

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
    setAnchorEl(null);
  }
  useEffect(() => {
    closeModal();
    setState("open");
  }, [state == "close"]);

  return (
    <Layout className="w-full h-full">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <SlackOutlined className="white" />
        <div className="demo-logo-vertical" />
        <AntMenu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <TeamOutlined />,
              label: "Manage Users",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <div className="flex flex-row justify-between pr-5">
            <AntButton
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
            <div>
              <>Welcome</>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle fontSize="large" />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={openModal}>My Profile</MenuItem>
                <MenuItem onClick={logout}>Logout</MenuItem>
              </Menu>
            </div>
          </div>
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
                    <Dialog.Panel className="w-full max-h-[520px] max-w-md transform overflow-hidden p-3 rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                      <Box sx={{ width: "100%" }}>
                        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                          <Tabs
                            value={value}
                            onChange={handleChange}
                            aria-label="basic tabs example"
                          >
                            <Tab
                              className="w-[200px]"
                              label="User Information"
                              {...a11yProps(0)}
                            />
                            <Tab
                              className="w-[200px]"
                              label="Change Password"
                              {...a11yProps(1)}
                            />
                          </Tabs>
                        </Box>
                        <CustomTabPanel value={value} index={0}>
                          <AdminInfo setState={setState} />
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={1}>
                          <ChangePassword setState={setState} />
                        </CustomTabPanel>
                      </Box>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <div className="flex flex-row justify-between align-bottom pl-3 pt-3 pb-6">
            <h1 className="text-2xl text-bold align-top">User</h1>
            <div className="flex flex-row gap-3 h-5">
              <form noValidate autoComplete="off" className="h-5">
                <FormControl sx={{ height: "10" }}>
                  <OutlinedInput
                    className="h-8 w-[310px]"
                    placeholder="Seach by Name, Email, Role, Provider"
                    onChange = {(e)=>{setSearchKeyword(e.target.value)}}
                  />
                </FormControl>
              </form>
            </div>
          </div>
          <div className="flex w-full justify-end pb-7">
            <Button
              variant="contained"
              startIcon={<PlusIcon />}
              className="right-0"
              onClick={() => setAddUser(true)}
            >
              Add User
            </Button>
            <AddUser
              addUser={addUser}
              setAddUser={setAddUser}
              setLoadUserData={setLoadUserData}
            />
          </div>
          <UserTable
            loadUserData={loadUserData}
            setEditUser={setEditUser}
            setUserId={setUserId}
            searchKeyword = {searchKeyword}
            setLoadUserData={setLoadUserData}
          />
          <EditUserInfo
            editUser={editUser}
            setEditUser={setEditUser}
            userId = {userId}
            setLoadUserData={setLoadUserData}
          />
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
