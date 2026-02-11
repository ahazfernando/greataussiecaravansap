import { Skeleton } from "@/components/ui/skeleton";

export default function EventsLoading() {
    return (
        <main>
            <section className="pt-5 pb-8 md:pt-20 md:pb-12 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center text-center mb-12">
                        <Skeleton className="h-12 w-96 mb-4" />
                        <Skeleton className="h-6 w-96" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="bg-white rounded-2xl overflow-hidden">
                                <Skeleton className="w-full aspect-[16/9]" />
                                <div className="p-6 space-y-4">
                                    <Skeleton className="h-4 w-32" />
                                    <Skeleton className="h-6 w-full" />
                                    <Skeleton className="h-4 w-3/4" />
                                    <Skeleton className="h-4 w-full" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}










