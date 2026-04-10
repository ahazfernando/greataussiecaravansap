import { AdminCenteredCardSkeleton } from "@/components/skeletons";

export default function AdminLoginLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <AdminCenteredCardSkeleton />
    </div>
  );
}
