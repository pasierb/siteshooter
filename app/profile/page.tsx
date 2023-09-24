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
          <CardDescription>
            API keys provide access to the API. Include the key as a query
            parameter with the name `key`.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ApiKeysTable />
        </CardContent>
      </Card>
    </div>
  );
}
