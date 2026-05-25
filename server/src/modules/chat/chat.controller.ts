import { Controller, Get, Query } from "@nestjs/common";
import { ChatDto } from "./dtos/ChatDto.dto";
import { ChatService } from "./chat.service";

@Controller("chat")
export class ChatController {
    constructor(private readonly chatService: ChatService) {}

    @Get()
    chat(@Query() query: ChatDto) {
        const { msg } = query;
        return this.chatService.chat(msg);
    }
}
