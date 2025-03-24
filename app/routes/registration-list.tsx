import { zodResolver } from "@hookform/resolvers/zod"

import type { Route } from "./+types/home";
import { z } from "zod"
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { useEffect, useRef, useState } from "react";
import { Textarea } from "~/components/ui/textarea";
import { registrationSchema } from "~/schemas/registration";
import { deleteRegistration, getRegistrationList, submitRegistration, updateStatusRegistration } from "~/api/registration";
import type { RegistrationData } from "~/types/registration";
import StatusDialog, { type StatusDialogProps } from "~/components/common/StatusDialog";
import AppBreadcrumb from "~/components/common/AppBreadcrumb";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Badge } from "~/components/ui/badge";
import { FileCheck, Pencil, Trash2 } from "lucide-react";
import ReviewDialog from "~/components/common/ReviewDialog";
import ConfirmDialog from "~/components/common/ConfirmDialog";
import { useNavigate } from "react-router";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Registration" },
    { name: "description" },
  ];
}

export default function RegistrationList() {
  const navigate = useNavigate();

  const [dialog, setDialog] = useState<StatusDialogProps>({
    open: false,
    type: "success" as "success" | "error",
    title: "",
    description: "",
  });
  const [reviewOpen, setReviewOpen] = useState(false);
  const [data, setData] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const onInitialData = () => {
    getRegistrationList().then(response => {
      setData(response)
    }).catch((error) => {
      setDialog({
        open: true,
        type: "error",
        title: "Something went wrong",
        description: error?.message || "Please try again later.",
      });
    });
  }

  const openDialog = (data: Omit<StatusDialogProps, "open">) => {
    setDialog({ ...data, open: true });
  };
  const handleOk = () => {
    dialog.onOk?.();
    setDialog((prev) => ({ ...prev, open: false }));
  };

  useEffect(() => {
    onInitialData();
  }, [])

  return (
    <>

      <div className="w-full max-w-sm p-6">
        <AppBreadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Registration" },
          ]}
        />
      </div>
      <div className="flex min-h-svh w-full justify-center p-6">
        <div className="w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Name</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Phone Number</TableHead>
                <TableHead>Photo File Url</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item: any) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.address}</TableCell>
                  <TableCell>{item.phoneNumber}</TableCell>
                  <TableCell>{item.photoFileUrl}</TableCell>
                  <TableCell>{
                    item.status === 'PROCESSING' && <Badge >Processing</Badge> ||
                    item.status === 'APPROVED' && <Badge className="bg-green-500 text-white">Approved</Badge> ||
                    item.status === 'REJECTED' && <Badge variant="destructive">Rejected</Badge>
                  }</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="cursor-pointer" onClick={() => {
                        navigate(`/registration/${item.id}`, { replace: true });
                      }}>
                        <Pencil className="h-4 w-4 text-muted-foreground " />
                      </Button>
                      <ConfirmDialog
                        title="Delete?"
                        description="Are you sure you want to Delete this?"
                        onConfirm={() => {
                          deleteRegistration(item.id).then(() => {
                            openDialog({
                              type: "success",
                              title: "Operation A successful",
                              description: "You have completed A.",
                              onOk: () => {
                                onInitialData();
                                setDialog((prev) => ({ ...prev, open: false }))
                              },
                            })
                          }).catch((error) => {
                            openDialog({
                              type: "error",
                              title: "Something went wrong",
                              description: error?.message || "Please try again later.",
                              onOk: () => {
                                setDialog((prev) => ({ ...prev, open: false }))
                              },
                            })
                          })
                        }}
                        trigger={
                          <Button variant="ghost" size="icon" className="cursor-pointer">
                            <Trash2 className="h-4 w-4 text-destructive " />
                          </Button>
                        }
                      />
                      {
                        item.status === 'PROCESSING' &&
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setSelectedItemId(item.id);
                            setReviewOpen(true);
                          }}
                        >
                          <FileCheck className="h-4 w-4" />
                        </Button>
                      }
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <StatusDialog
        open={dialog.open}
        type={dialog.type}
        title={dialog.title}
        description={dialog.description}
        onOk={handleOk}
      />

      <ReviewDialog
        open={reviewOpen}
        onOpenChange={setReviewOpen}
        onApprove={() => {

          if (!selectedItemId) return;
          setReviewOpen(false);
          updateStatusRegistration(selectedItemId, 'APPROVED').then(() => {
            openDialog({
              type: "success",
              title: "Approved",
              description: "You have completed a Approve registration.",
              onOk: () => {
                onInitialData();
                setDialog((prev) => ({ ...prev, open: false }))
              },
            })
          }).catch(error => {
            openDialog({
              type: "error",
              title: "Something went wrong",
              description: error?.message || "Please try again later.",
            });
          })
        }}
        onReject={() => {

          if (!selectedItemId) return;
          setReviewOpen(false);
          updateStatusRegistration(selectedItemId, 'REJECTED').then(() => {
            openDialog({
              type: "success",
              title: "Rejected",
              description: "You have completed a Reject registration.",
              onOk: () => {
                onInitialData();
                setDialog((prev) => ({ ...prev, open: false }))
              },
            })
          }).catch(error => {
            openDialog({
              type: "error",
              title: "Something went wrong",
              description: error?.message || "Please try again later.",
            });
          })
        }}
      />
    </>
  )
}
