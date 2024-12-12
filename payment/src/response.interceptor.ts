import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => ({
        success: true, // Luôn thông báo thành công
        message: 'Request processed successfully', // Thông báo mặc định, có thể tùy chỉnh
        data, // Dữ liệu thực tế trả về từ handler
      })),
    );
  }
}
