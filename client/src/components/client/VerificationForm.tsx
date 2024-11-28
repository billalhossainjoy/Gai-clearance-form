import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useSearchParams } from "react-router-dom";
import { Button } from "../ui/button";

const VerificationForm: React.FC = () => {
  const [_, setSearchParams] = useSearchParams();
  const [roll, setRoll] = useState<number | undefined>(undefined);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoll(e.target.value ? parseInt(e.target.value, 10) : undefined);
    setSearchParams({
      varification: String(e.target.value ? parseInt(e.target.value, 10) : ""),
    });
	};
	
	
  return (
    <div className="border rounded p-3 w-80 ">
      <div className="flex flex-col gap-3">
        <Label>Type Roll Number</Label>
        <Input type="number" value={roll} onChange={(e) => handleChange(e)} />
        <Button>Check</Button>
      </div>
    </div>
  );
};
export default VerificationForm;
