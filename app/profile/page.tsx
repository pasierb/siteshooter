import { ApiKeysTable } from "@/components/api-keys-table";

export const dynamic = "force-dynamic";

export default function ProfilePage() {
  return (
    <div className="container">
      <ApiKeysTable />
    </div>
  );
}
