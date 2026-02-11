import { Layout } from "@/components/layout";
import { Skeleton } from "@/components/ui/skeleton";

export default function BlogLoading() {
  return (
    <Layout>
      <section className="bg-white py-16">
        <div className="container-wide">
          <div className="max-w-2xl">
            <Skeleton className="h-12 w-96 mb-4" />
            <Skeleton className="h-6 w-full" />
          </div>
        </div>
      </section>
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-8">
            <Skeleton className="aspect-[16/10] rounded-xl" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </div>
      </section>
      <section className="section-padding bg-white">
        <div className="container-wide">
          <Skeleton className="h-8 w-48 mb-8" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-[16/10] rounded-xl" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

