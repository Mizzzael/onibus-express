import {z} from "zod";
import UserSchema from "@/domains/User/models/User/user.schema";

type User = z.infer<typeof UserSchema>;

export default User;
