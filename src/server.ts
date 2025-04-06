import app from "./app";
import config from "./config/config";
import logger from "./utils/logger";

class Server {
  private port: number;
  constructor(port: number) {
    this.port = port;
  }
  public start() {
    app.listen(this.port, () => {
      logger.info(`Server is running port ${this.port}`);
    });
  }
}

const server = new Server(Number(config.port));
server.start();
