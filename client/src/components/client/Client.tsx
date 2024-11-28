import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import ClearanceForm from "./ClearanceForm";
import VerificationForm from "./VerificationForm";

const Client: React.FC = () => {
  return (
    <Tabs defaultValue="clearanceForm" className="w-full my-5">
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
