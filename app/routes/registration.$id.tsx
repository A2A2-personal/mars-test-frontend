import { zodResolver } from "@hookform/resolvers/zod"

import type { Route } from "./+types/home";
import { z } from "zod"
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { Textarea } from "~/components/ui/textarea";
import { registrationSchema } from "~/schemas/registration";
import { getRegistration, submitRegistration, updateRegistration } from "~/api/registration";
import type { RegistrationData } from "~/types/registration";
import StatusDialog, { type StatusDialogProps } from "~/components/common/StatusDialog";
import AppBreadcrumb from "~/components/common/AppBreadcrumb";
import { useNavigate } from "react-router";
import { useParams } from "react-router";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Registration" },
    { name: "description" },
  ];
}

export default function Registration() {
  const { id } = useParams()
  const navigate = useNavigate();

  const [dialog, setDialog] = useState<StatusDialogProps>({
    open: false,
    type: "success" as "success" | "error",
    title: "",
    description: "",
  });
  const [photo, setPhoto] = useState('/default-photo.png');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const form = useForm<RegistrationData>({ resolver: zodResolver(registrationSchema), });

  const onInitialData = () => {
    if (!id) return;
    getRegistration(id).then(response => {
      form.setValue("name", response.name)
      form.setValue("address", response.address)
      form.setValue("phoneNumber", response.phoneNumber)
      form.setValue("photo", response.photoUrl)
      setPhoto(response.photoUrl)
    }).catch((error) => {
      setDialog({
        open: true,
        type: "error",
        title: "Something went wrong",
        description: error?.message || "Please try again later.",
      });
    });
  }

  useEffect(() => {
    if (!id) return;
    onInitialData();
  }, [])

  const openDialog = (data: Omit<StatusDialogProps, "open">) => {
    setDialog({ ...data, open: true });
  };

  const onSubmit = async (values: RegistrationData) => {
    if (!id) return;
    await updateRegistration(id, values).catch((response => {
      openDialog({
        type: "success",
        title: "Success!",
        description: "Your data has been updated.",
      });
      navigate("/", { replace: true });
    })).catch((error) => {
      openDialog({
        type: "error",
        title: "Something went wrong",
        description: error?.message || "Please try again later.",
      });
    });
  };

  const handleOk = () => {
    dialog.onOk?.();
    setDialog((prev) => ({ ...prev, open: false }));
  };

  function onClearPhoto() {
    form.setValue("photo", undefined);
    setPhoto("/default-photo.png");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }
  return (
    <>

      <div className="w-full max-w-sm p-3">
        <AppBreadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Registration", href: "/registration/list" },
            { label: "Edit Registration" },

          ]}
        />
      </div>
      <div className="flex min-h-svh w-full items-center justify-start p-3">
        <div className="w-full max-w-sm">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="relative md:block">
                <img
                  src={photo}
                  alt="Image"
                  className="border"
                  style={{ maxWidth: 380, height: 230, padding: 10 }}
                />
                {
                  photo !== "/default-photo.png" &&
                  <Button
                    type="button"
                    variant="destructive"
                    style={{ marginTop: 8 }}
                    onClick={onClearPhoto}
                  >
                    DELETE
                  </Button>
                }
              </div>
              <FormField
                control={form.control}
                name="photo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Photo</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        onChange={(e) => {
                          field.onChange(e.target.files);
                          if (e.target.files && e.target.files[0]) {
                            setPhoto(URL.createObjectURL(e.target.files[0]));
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                onClick={() =>
                  openDialog({
                    type: "success",
                    title: "Operation A successful",
                    description: "You have completed A.",
                    onOk: () => {
                      setDialog((prev) => ({ ...prev, open: false }))
                      navigate("/registration/list", { replace: true });
                    },
                  })
                }
              >
                Submit
              </Button>

              <Button type="button" variant="secondary" style={{ marginLeft: 8 }} onClick={() => {
                onInitialData();
              }}>Reset</Button>
            </form>
          </Form>
        </div>
      </div>
      <StatusDialog
        open={dialog.open}
        type={dialog.type}
        title={dialog.title}
        description={dialog.description}
        onOk={handleOk}
      />
    </>
  )
}
