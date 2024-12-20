import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { AppRepositories } from 'src/schema/repositories/app.repositories';
import { BalanceRepositories } from 'src/schema/repositories/balance.repositories';
import { BillRepositories } from 'src/schema/repositories/bill.repositories';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  constructor(
    private readonly appRepo: AppRepositories,
    private readonly balanceRepo: BalanceRepositories,
    private readonly billRepo: BillRepositories,
  ) {}

  @Cron('0 * * * *')
  async handleCron() {
    this.logger.debug('Cron job đang chạy mỗi tiếng');
    const userIds = await this.balanceRepo.getUsers();

    userIds.forEach(async (user) => {
      await this.updateBalance(user);
    });
  }
  @Cron('0 0 1 * *')
  async handleCronMonth() {
    this.logger.debug('Cron job đang chạy mỗi Tháng');

    const userIds = await this.balanceRepo.getUsers();

    userIds.forEach(async (user) => {
      await this.updateBalanceMonth(user);
    });
  }

  async updateBalance(id: string) {
    try {
      const user = await this.balanceRepo.getBalance(id);
      const apps = await this.appRepo.getApps(id);
      const time = this.getHoursUntilEndOfMonth();
      if (apps) {
        const estimatedCost = apps
          .map((app) => app.priceInHouse * time)
          .reduce((total, current) => total + current, 0);
        let costUsed = user.costUsed;
        const estimatedTime = new Date();
        if (this.checkTime(user.updatedAt, new Date())) {
          const useInHour = apps
            .map((app) => app.priceInHouse)
            .reduce((total, current) => total + current, 0);
          costUsed += useInHour;

          estimatedTime.setHours(
            estimatedTime.getHours() +
              Math.floor((user.balance - costUsed) / useInHour),
          );
        }
        await this.balanceRepo.updateCost(
          id,
          costUsed,
          estimatedCost,
          estimatedTime,
        );
      }
    } catch (error) {}
  }

  async updateBalanceMonth(id: string) {
    const balance = await this.balanceRepo.getBalance(id);
    const time = new Date();
    time.setMonth(time.getMonth() - 1);
    await this.balanceRepo.updateBalance(
      id,
      balance.costUsed,
      `Thanh toán hóa đơn tháng ${time.getMonth()}`,
    );

    const today = new Date();
    const firstDayThisMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      1,
    );
    const lastDayLastMonth = new Date(firstDayThisMonth.getTime() - 1);
    const firstDayLastMonth = new Date(
      lastDayLastMonth.getFullYear(),
      lastDayLastMonth.getMonth(),
      1,
    );

    await this.billRepo.createBill({
      userId: balance.userId,
      code: 'đạ',
      start: firstDayLastMonth,
      end: lastDayLastMonth,
      timeOfUse: 720,
      amount: balance.costUsed,
      description: `Thanh toán hóa đơn tháng ${time.getMonth()}`,
    });
  }

  getHoursUntilEndOfMonth() {
    const now = new Date();
    const endOfMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
      23,
      59,
      59,
    );
    const diffInMs = endOfMonth.getTime() - now.getTime();
    const hoursLeft = Math.floor(diffInMs / (1000 * 60 * 60));
    return hoursLeft;
  }

  checkTime(time1: Date, time2: Date): boolean {
    const diffInMs = Math.abs(time2.getTime() - time1.getTime());
    const oneHourInMs = 1000 * 60 * 60;
    return diffInMs > oneHourInMs;
  }
}
