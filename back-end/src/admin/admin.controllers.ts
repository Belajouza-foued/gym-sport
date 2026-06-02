import { Controller, Get, Patch, Delete, Param, Body } from '@nestjs/common';
import { AdminService } from '../admin/admin.servive';


@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // 📊 STATS
  @Get('stats')
  getStats() {
    return this.adminService.getStats();
  }

  // 📦 ORDERS
  @Get('orders')
  getAllOrders() {
    return this.adminService.getAllOrders();
  }

  // 👥 USERS
  @Get('users')
  getAllUsers() {
    return this.adminService.getAllUsers();
  }

  // 🔄 UPDATE ORDER STATUS
  @Patch('orders/:id/status')
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: string,
  ) {
    return this.adminService.updateOrderStatus(id, status);
  }  // ❌ DELETE ORDER (FIXED)
  @Delete('orders/:id')
  deleteOrder(@Param('id') id: string) {
    return this.adminService.deleteOrder(id);
  }
}