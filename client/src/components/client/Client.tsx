import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import ClearanceForm from "./ClearanceForm";
import VerificationForm from "./VerificationForm";
import { useNavigate, useSearchParams } from "react-router-dom";

const Client: React.FC = () => {
  const [_, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [state, setState] = useState("clearanceForm");

  useEffect(() => {
    if (state === "verificationForm")
      setSearchParams({
        varification: "",
      });
    else setSearchParams({});
  }, [navigate, state, setSearchParams]);
  return (
    <Tabs defaultValue={state} onValueChange={setState} className="w-full my-5">
      <TabsList className="w-full">
        <TabsTrigger value="clearanceForm" className="w-full">
          Clearance Form
        </TabsTrigger>
        <TabsTrigger value="verificationForm" className="w-full">
          Verification Form
        </TabsTrigger>
      </TabsList>
      <TabsContent value="clearanceForm">
        <ClearanceForm />
      </TabsContent>
      <TabsContent value="verificationForm">
        <VerificationForm />
      </TabsContent>
    </Tabs>
  );
};

export default Client;
