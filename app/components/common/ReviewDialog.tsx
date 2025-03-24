import { FileCheck } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";

type Props = {
  onApprove: () => void;
  onReject: () => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function ReviewDialog({
  open,
  onOpenChange,
  onApprove,
  onReject
}: Props) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon" className="cursor-pointer">
          <FileCheck className="w-4 h-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Review request</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex justify-between">
          <Button variant="destructive" onClick={onReject}>
            Reject
          </Button>
          <Button variant="default" onClick={onApprove}>
            Approve
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
