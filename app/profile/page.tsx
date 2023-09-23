import { ApiKeysTable } from "@/components/api-keys-table";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export const dynamic = "force-dynamic";

export default function ProfilePage() {
  return (
    <div className="container">
      <Card>
        <CardHeader>
          <CardTitle>API keys</CardTitle>
          <CardDescription>API keys grant access to the api. Put key as a query parameter.</CardDescription>
        </CardHeader>
        <CardContent>
          <ApiKeysTable />
        </CardContent>
      </Card>
    </div>
  );
}
