import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface Props {
  id: string;
}

const StudentActionButton: React.FC<Props> = ({ id }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex gap-3">
        <Button
          className="bg-green-500"
          onClick={() => navigate(`/admin/all-student?update=${id}`)}
        >
          Edit
        </Button>
        <Button
          className="bg-red-500"
          onClick={() => navigate(`/admin/all-student?delete=${id}`)}
        >
          Delete
        </Button>
      </div>
    </>
  );
};
export default StudentActionButton;
