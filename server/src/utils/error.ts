import { HttpException, HttpStatus } from "@nestjs/common";

export default function error(err: unknown) {
    if (err instanceof Error) {
        return new HttpException(
            err?.message,
            HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
    return new HttpException(
        "Internal Server Error",
        HttpStatus.INTERNAL_SERVER_ERROR,
    );
}
