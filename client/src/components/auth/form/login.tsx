import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginSchemaType } from "@/schema/auth.schema";
import { Form } from "@/components/ui/form";
import gaiLogo from "/gai.jpg";
import { ArrowRight } from "lucide-react";
import { FormFieldType } from "@/constant";
import CustomForm from "@/components/common/FormField";
import { Button } from "@/components/ui/button";

const LoginForm: React.FC = () => {
  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginSchemaType) => {
    console.log(data);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
      <Form {...form}>
        <div className="flex flex-col items-center space-y-2 text-center gap-3 mb-8">
          <div className="h-28 w-28 text-primary text-green-500">
            <img className="w-full" src={gaiLogo} alt="" />
          </div>
          <h1 className="text-2xl font-bold ">Login Account</h1>
          <p className="flex items-center gap-2 text-sky-500">
            Login with email and password to go dashboard
            <ArrowRight className="w-4 h-4 " />
          </p>
        </div>

        <CustomForm<LoginSchemaType>
          name="identifier"
          control={form.control}
          inputType={FormFieldType.INPUT}
          label="Email"
          placeholder="gai@example.com"
        />
        <CustomForm<LoginSchemaType>
          name="password"
          control={form.control}
          inputType={FormFieldType.PASSWORD}
          label="Password"
        />
        <Button className="w-full">Login</Button>
      </Form>
    </form>
  );
};
export default LoginForm;
