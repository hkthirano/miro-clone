import { v } from "convex/values"

import { mutation } from "./_generated/server"

const images = [
    "/placeholder/1.jpg",
    "/placeholder/2.jpg",
    "/placeholder/3.jpg",
    "/placeholder/4.jpg",
    "/placeholder/5.jpg",
    "/placeholder/6.jpg",
    "/placeholder/7.jpg",
    "/placeholder/8.jpg",
    "/placeholder/9.jpg",
    "/placeholder/10.jpg"
]
export const create = mutation({
    args: {
        orgId: v.string(),
        title: v.string(),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized");
        }

        const randomImage = images[Math.floor(Math.random() * images.length)];

        const board = await ctx.db.insert("boards", {
            title: args.title,
            orgId: args.orgId,
            authorId: identity.subject,
            authorName: identity.name!,
            imageUrl: randomImage
        })

        return board;
    }
})