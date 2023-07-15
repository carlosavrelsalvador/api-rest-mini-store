interface PingResponse {
  message: string;
}

// @Route("ping")
// export default class PingController {
//   @Get("/")
//   public async getMessage(): Promise<PingResponse> {
//     return {
//       message: "pong",
//     };
//   }
// }
export const PingController = (): string => "pong";
