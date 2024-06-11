"use client"

import { useOrganization } from "@clerk/nextjs";
import { EmptyOrg } from "./_components/empty-org";
import { BoardList } from "./_components/board-list";
import { useSearchParams } from "next/navigation";

const DashboardPage = () => {
    const searchParams = useSearchParams();
    const search = searchParams.get("search") || undefined;
    const favorites = searchParams.get("favorites") || undefined;
    const { organization } = useOrganization();

    return (
        <div className=" flex-1 h-[calc(100%-80px)] p-6">
            {!organization ? (
                <EmptyOrg />
            ) : (
                <BoardList
                    orgId={organization.id}
                    query={{
                        search,
                        favorites,
                    }} />
            )}

        </div>
    );
}

export default DashboardPage;