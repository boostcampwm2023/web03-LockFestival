import { Injectable, Logger, LoggerService, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger: LoggerService = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const { ip, method, originalUrl } = req;

    const userAgent = req.get('user-agent') || '';

    res.on('finish', () => {
      const { statusCode } = res;

      this.logger.log(`${method} ${statusCode} - ${originalUrl} - ${ip} - ${userAgent}`);
    });

    next();
  }
}
