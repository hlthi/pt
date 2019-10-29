import * as http from "http";

export default function shutdown(server: http.Server) {
  console.log("Gracefully shutdown.");
  server.close();
}
