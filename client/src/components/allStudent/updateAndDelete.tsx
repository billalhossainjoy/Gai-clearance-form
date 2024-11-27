import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { deleteStudent, fetchStudent } from "@/store/student/student.slice";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import NewStudentEntry from "../student/studentEntryForm";
import { Loader } from "lucide-react";

const UpdateDeleteDialog: React.FC = () => {
	const dispatch = useAppDispatch();
	const {loader, student} = useAppSelector(state => state.student);
  const [updateDialog, setUpdateDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const deleteHandler = () => {
    dispatch(deleteStudent(searchParams.get("delete") ?? "")).then((res) => {
      if (res.payload.id) navigate("/admin/all-student");
    });
  };

  useEffect(() => {
    const updateParam = searchParams.get("update");
    const deleteParam = searchParams.get("delete");

    if (updateParam) {
      setUpdateDialog(true);
      dispatch(fetchStudent(updateParam));
    } else {
      setUpdateDialog(false);
    }

    if (deleteParam) {
      setDeleteDialog(true);
    } else {
      setDeleteDialog(false);
    }
  }, [searchParams, dispatch]);
  return (
    <div>
      <Dialog
        open={updateDialog}
        onOpenChange={() => navigate("/admin/all-student")}
      >
        <DialogContent>
          <DialogTitle className="text-destructive">Update</DialogTitle>
          <DialogDescription>
            {!loader ? (
              <NewStudentEntry student={student} />
            ) : (
              <div className="flex w-full h-20 justify-center items-center">
                <Loader className="animate-spin" />
              </div>
            )}
          </DialogDescription>
        </DialogContent>
      </Dialog>
      <Dialog
        open={deleteDialog}
        onOpenChange={() => navigate("/admin/all-student")}
      >
        <DialogContent>
          <DialogTitle className="text-destructive">Delete</DialogTitle>
          <DialogDescription>
            <h1 className=" my-3 text-lg text-black font-semibold">
              Are you sure to delete to this student
            </h1>
            <div className="w-full text-end">
              <Button
                variant="ghost"
                onClick={() => navigate("/admin/account")}
              >
                Cancel
              </Button>
              <Button
                variant="outline"
                className="border-destructive text-destructive ml-3"
                onClick={() => deleteHandler()}
              >
                Delete
              </Button>
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default UpdateDeleteDialog;
