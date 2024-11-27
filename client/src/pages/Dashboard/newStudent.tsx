import CustomForm from "@/components/common/FormField";
import { studentSchema, StudentSchemaType } from "@/schema/student.schema";
import { FormFieldType } from "@/constant";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { activeStatusOptions, depertmentOptions, sessionOptions, shiftOptions } from "@/components/constaint";

const NewStudentPage: React.FC = () => {
  const form = useForm<StudentSchemaType>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      active: true,
    },
  });

  const onSubmit = (data: StudentSchemaType) => {
    console.log(data);
  };

  return (
    <div>
      <div className="container mx-auto px-4 py-5">
        <h1 className="text-3xl font-bold text-foreground mb-4">Student</h1>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-secondary p-6 rounded space-y-3 border"
        >
          <Form {...form}>
            <h1 className="text-xl font-semibold text-foreground">
              Fill already passed student information.
            </h1>
            <CustomForm<StudentSchemaType>
              name="name"
              control={form.control}
              inputType={FormFieldType.INPUT}
              label="Name"
              placeholder="name"
            />
            <CustomForm<StudentSchemaType>
              name="technology"
              control={form.control}
              inputType={FormFieldType.SELECT}
              options={depertmentOptions}
              placeholder="Select Technology"
              label="Tecnology"
            />
            <CustomForm<StudentSchemaType>
              name="roll"
              control={form.control}
              inputType={FormFieldType.NUMBER}
              label="Board Roll"
              placeholder="roll number"
            />
            <CustomForm<StudentSchemaType>
              name="registrationNumber"
              control={form.control}
              inputType={FormFieldType.NUMBER}
              label="Registration Number"
              placeholder="registration number"
            />
            <CustomForm<StudentSchemaType>
              name="session"
              control={form.control}
              inputType={FormFieldType.SELECT}
              options={sessionOptions}
              label="Session"
              placeholder="select session"
            />
            <CustomForm<StudentSchemaType>
              name="shift"
              control={form.control}
              inputType={FormFieldType.SELECT}
              options={shiftOptions}
              label="Shift"
              placeholder="select shift"
            />
            <div className="flex gap-3">
              <div>
                <CustomForm<StudentSchemaType>
                  name="active"
                  control={form.control}
                  inputType={FormFieldType.BOOLSELECT}
                  options={activeStatusOptions}
                  label="Active"
                  placeholder="active or block"
                />
              </div>
              <div className="w-full">
                {!form.watch("active") && (
                  <CustomForm<StudentSchemaType>
                    name="blockReason"
                    control={form.control}
                    inputType={FormFieldType.INPUT}
                    label="Block Reason"
                    placeholder="type the reson why block the stuent or who block the student"
                  />
                )}
              </div>
            </div>

            <Button>Add Student</Button>
          </Form>
        </form>
      </div>
    </div>
  );
};
export default NewStudentPage;
