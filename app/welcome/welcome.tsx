import { Link } from "react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";


export function Welcome() {
  return (

    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
        <Card className="w-[680px]">
          <CardHeader>
            <CardTitle>Mars Testing</CardTitle>
            <CardDescription>
              What's new?
            </CardDescription>
            <CardDescription>
              - สร้างใบสมัครประกัน รายละอียดชื่อที่อยู่ เบอร์โทรศัพท์ รูปถ่าย, รูปถ่ายต้องทำการเก็บบน Cloud (AWS), สามารถแก้ไข รายละเอียดของผู้สมัคร และยกลิกการสมัครได้, approve/reject รายการที่สมัครเข้ามา`
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CardTitle>Menu</CardTitle>
            <Link to={'/registration'}>
              <div
                className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 pt-4 last:mb-0 last:pb-0"
              >
                <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Registration
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Create a new Registration
                  </p>
                </div>
              </div>
            </Link>
            <Link to={'/registration/list'}>
              <div
                className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 pt-4 last:mb-0 last:pb-0"
              >
                <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Registration Manage
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Show a registration list
                  </p>
                </div>
              </div>
            </Link>
          </CardContent>
        </Card>
      </div>

    </main>
  );
}

