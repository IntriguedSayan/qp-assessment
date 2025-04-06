// src/utils/logger.ts
import { createLogger, format, transports } from "winston";

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta: { service: 'grocery-booking-api' },
  transports: [
    new transports.Console(),
  ],
});

export default logger;
