import { ApiKeysTable } from "@/components/api-keys-table";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { ShotsList } from "@/components/shots-list";

export const dynamic = "force-dynamic";

export default function ProfilePage() {
  return (
    <div className="container">
      <div className="flex flex-col gap-8">
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

        <Card>
          <CardHeader>
            <CardTitle>Shots</CardTitle>
          </CardHeader>
          <CardContent>
            <ShotsList />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
