import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import ClearanceForm from "./ClearanceForm";
import { useNavigate, useSearchParams } from "react-router-dom";

const Client: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [state, setState] = useState("clearanceForm");

  useEffect(() => {
    if (searchParams.get("varification")) setState("verificationForm");

    if (state === "verificationForm") navigate("/?varification=");
    else setSearchParams({});
  }, [navigate, state, setSearchParams,searchParams]);
  return (
    <Tabs defaultValue={state} onValueChange={setState} className="w-full my-5">
      <TabsList className="w-full">
        <TabsTrigger value="clearanceForm" className="w-full">
          Clearance Form
        </TabsTrigger>
      </TabsList>
      <TabsContent value="clearanceForm">
        <ClearanceForm />
      </TabsContent>
    </Tabs>
  );
};

export default Client;
