import {z} from "zod"

export const loginSchema = z.object({
    username: z.string().min(3).max(20),
    password: z.string().min(6).max(20)
})

export type loginInput=z.infer<typeof loginSchema>

export const roomSchema = z.object({
    roomName: z.string().min(3).max(20),
    username: z.string().min(3).max(20)
})
export type roomInput=z.infer<typeof roomSchema>

export const joinRoomSchema = z.object({
    roomId: z.string().uuid(),
    username: z.string().min(3).max(20)
})

export type joinroomInput=z.infer<typeof joinRoomSchema>

export const signupSchema=z.object({
    username: z.string().min(3).max(20),
    email:z.string().email(),
    password: z.string().min(6).max(20)
})

export type signupInput=z.infer<typeof signupSchema>