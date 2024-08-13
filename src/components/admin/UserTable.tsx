import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import TableHead from "@mui/material/TableHead";
import { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { getReq, postReq } from "../../services/reqClient";
import { toast } from "react-toastify";

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, Math.max(1, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

interface UserTableProps {
  loadUserData: boolean;
  setEditUser: React.Dispatch<React.SetStateAction<boolean>>;
  searchKeyword: string;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
  setLoadUserData: React.Dispatch<React.SetStateAction<boolean>>;

}

const UserTable: React.FC<UserTableProps> = ({
  loadUserData,
  setEditUser,
  setUserId,
  searchKeyword,
  setLoadUserData,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [rows, setRows] = useState([] as any);
  const [count, setCount] = useState(0);
  const [selectedUser,setSelectedUser] = useState("")
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const res = await getReq("/api/getAllUsers" + `?page=${page + 1}`);
      setRows(res.filteredUsers.filter((user:any)=>
        user.name.toLowerCase().includes(searchKeyword.toLowerCase())
    || user.email.toLowerCase().includes(searchKeyword.toLowerCase())
    || user.phone_number.toLowerCase().includes(searchKeyword.toLowerCase())
    || user.address.toLowerCase().includes(searchKeyword.toLowerCase())
    || user.role.toLowerCase().includes(searchKeyword.toLowerCase())
    || user.provider.toLowerCase().includes(searchKeyword.toLowerCase())));
      console.log('rows', rows);
      setCount(rows.length);
    };
    fetchData();
    setIsLoading(false);
    setLoadUserData(false);
  }, [page, count, loadUserData == true,searchKeyword]);

  const EditUserInfo = (id: string) => {
    setUserId(id);
    setTimeout(() => {
      setSelectedUser(id)
      setEditUser(true);
    },300)
    
  };


  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, count - page * rowsPerPage);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(6);
    setPage(0);
  };

  const deleteUser = async (id: string) => {
    const res = await postReq(`/api/deleteUser/${id}`, {});
    if (res.status === 200) {
      toast.success("Delete Success");
      setCount(count - 1);
    }
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await getReq('/api/getAllUsers' + `?page=${page+1}`);
  //     setRows(res.filteredUsers);
  //     setCount(res.user_nums);
  //   };
  //   fetchData();
  //   console.log('rows', rows);
  // }, [page,count]);

  return (
    <div>
      <TableContainer component={Paper} className="h-[578px] overflow-hidden">
        <Table
          sx={{ minWidth: 500, height: 578 }}
          aria-label="custom pagination table"
        >
          <TableHead>
            <TableRow>
              <TableCell style={{ width: "15%", height: 53 }} align="center">
                Username
              </TableCell>
              <TableCell style={{ width: "17%", height: 53 }} align="center">
                Email
              </TableCell>
              <TableCell style={{ width: "15%", height: 53 }} align="center">
                Phone Number
              </TableCell>
              <TableCell style={{ width: "20%", height: 53 }} align="center">
                Address
              </TableCell>
              <TableCell style={{ width: "10%", height: 53 }} align="center">
                Role
              </TableCell>
              <TableCell style={{ width: "10%", height: 53 }} align="center">
                Provider
              </TableCell>
              <TableCell style={{ height: 53 }} align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="align-top overflow-hidden h-[468px]">
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row: any) => (
            // {rows != undefined && rows.length > 0 && !isLoading ? (
            //   rows.map((row: any) => (
                <TableRow key={row.id} style={{ height: 53 }}>
                  <TableCell style={{ height: 53 }} align="center">
                    {row.name}
                  </TableCell>
                  <TableCell style={{ height: 53 }} align="center">
                    {row.email}
                  </TableCell>
                  <TableCell style={{ height: 53 }} align="center">
                    {row.phone_number}
                  </TableCell>
                  <TableCell style={{ height: 53 }} align="center">
                    {row.address}
                  </TableCell>
                  <TableCell style={{ height: 53 }} align="center">
                    {row.role}
                  </TableCell>
                  <TableCell style={{ height: 53 }} align="center">
                    {row.provider}
                  </TableCell>
                  <TableCell align="right" className="flex flex-row h-[53px]">
                    <IconButton
                      aria-label="edit"
                      title="Edit"
                      onClick={() => EditUserInfo(row.id)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      title="Delete"
                      onClick={() => deleteUser(row.id)}
                    >
                      <DeleteIcon />
                    </IconButton>

                  </TableCell>
                </TableRow>
              ))}
            {/* ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No users found
                </TableCell>
              </TableRow>
            )} */}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * (emptyRows + 1) }}>
                <TableCell colSpan={8} />
              </TableRow>
            )}
            
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                colSpan={8}
                count={count}
                rowsPerPage={6}
                rowsPerPageOptions={[]}
                page={page}
                onPageChange={handleChangePage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
};
export default UserTable;
