import {z} from "zod";

const UserSchema = z.object({
    nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres").max(100, "Nome não pode ultrapassar 100 caracteres"),
    cpf: z.string()
        .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF inválido. Formato esperado: XXX.XXX.XXX-XX")
        .min(14, "CPF deve ter 14 caracteres").max(14, "CPF deve ter 14 caracteres"),
    email: z.string().email("Email inválido").max(255, "Email não pode ultrapassar 255 caracteres"),
    dataDeNascimento: z.string().regex(/^\d{1,2}(\/)+\d{1,2}(\/)+\d{4}$/, "Formato de aniversário incorreto")
});

export default UserSchema;