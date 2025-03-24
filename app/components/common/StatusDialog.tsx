import {
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialog
} from "../ui/alert-dialog";
export type StatusDialogProps = {
  open: boolean;
  type: "success" | "error" | "warning";
  title?: string;
  description?: string;
  onOk?: () => void;
};

export default function StatusDialog({
  open,
  type = "success",
  title = "Success",
  description = "Your action was successful.",
  onOk,
}: StatusDialogProps) {
  const handleOk = () => {
    onOk?.();
  };

  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className={type === "error" ? "text-destructive" : "text-green-600"}>
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={handleOk}>OK</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
