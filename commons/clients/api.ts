import { create } from "axios";

export default function GetAxiosClient() {
    return create({
        baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
    })
}