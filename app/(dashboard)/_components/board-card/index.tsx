"use client"

import { useAuth } from "@clerk/nextjs";

import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

import { Skeleton } from "@/components/ui/skeleton";

import { Overlay } from "./overlay";
import { Footer } from "./footer"

interface BoardCardProps {
    id: string;
    title: string;
    authorName: string;
    authorId: string;
    createdAt: number;
    imageUrl: string;
    orgId: string;
    isFavorite: boolean;
}

export const BoardCard = ({
    id,
    title,
    authorName,
    authorId,
    createdAt,
    imageUrl,
    orgId,
    isFavorite
}: BoardCardProps) => {
    const { userId } = useAuth();

    const authorLable = userId === authorId ? "You" : authorName;
    const createedAtLabel = formatDistanceToNow(createdAt,
        { addSuffix: true });

    return (
        <Link href={`/board/${id}`}>
            <div className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden">
                <div className="relative flex-1 bg-amber-50">
                    <Image
                        src={imageUrl}
                        alt="Doodle"
                        fill
                        className="object-fill" />
                    <Overlay />
                </div>
                <Footer
                    isFavorite={isFavorite}
                    title={title}
                    authorLable={authorLable}
                    createedAtLabel={createedAtLabel}
                    onClick={() => { }}
                    disabled={false} />
            </div>
        </Link>
    )
};

BoardCard.Skeleton = function BoardCardSkeleton() {
    return (
        <div className="aspect-[100/127] rounded-lg overflow-hidden">
            <Skeleton className="h-full w-full" />
        </div>
    )
}