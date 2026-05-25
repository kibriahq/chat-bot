import { Injectable } from "@nestjs/common";
import OpenAI from "openai";
import error from "src/utils/error";

@Injectable()
export class ChatService {
    private openai: OpenAI;

    private messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [];

    constructor() {
        this.openai = new OpenAI({
            apiKey: "lm-studio",
            baseURL: "http://localhost:1234/v1",
        });
    }

    async chat(msg: string) {
        try {
            // user message add
            this.messages.push({
                role: "user",
                content: msg,
            });
            const SYSTEM_PROMPT = `You are a helpful, cheerful assistant. You are concise and avoid unnecessary explanations.`;
            const response = await this.openai.chat.completions.create({
                model: "google/gemma-3-1b",
                messages: [
                    {
                        role: "system",
                        content: SYSTEM_PROMPT,
                    },
                    ...this.messages,
                ],
            });

            const assistantMsg = response.choices[0].message;
            this.messages.push(assistantMsg);
            return assistantMsg.content;
        } catch (err: unknown) {
            throw error(err);
        }
    }
}
