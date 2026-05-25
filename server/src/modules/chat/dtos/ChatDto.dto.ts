import { IsNotEmpty } from "class-validator";

export class ChatDto {
    @IsNotEmpty({ message: "Message is required" })
    msg!: string;
}
