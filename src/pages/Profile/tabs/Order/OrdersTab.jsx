import { useState } from 'react';
import { orderData } from '../../../../service/profileData';
import OrdersFilter from './OrdersFilter';
import OrdersTable from './OrderTable';
import FashionPagination from '../../../../components/panigation/Panigation';

const ORDERS_PER_PAGE = 5;

export default function OrdersTab() {
  const [searchId, setSearchId] = useState('');
  const [filterStatus, setFilterStatus] = useState('Tất cả');
  const [filterDate, setFilterDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredOrders = orderData.filter(order => {
    const matchId = order.id.toLowerCase().includes(searchId.toLowerCase());
    const matchStatus = filterStatus === 'Tất cả' || order.status === filterStatus;
    const matchDate = filterDate === '' || order.date === filterDate;
    return matchId && matchStatus && matchDate;
  });

  // Tính toán đơn hàng hiển thị trên trang hiện tại
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ORDERS_PER_PAGE,
    currentPage * ORDERS_PER_PAGE
  );

  // Tính tổng số trang
  const totalPages = Math.ceil(filteredOrders.length / ORDERS_PER_PAGE);

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Đơn hàng của tôi</h1>
      <OrdersFilter
        searchId={searchId}
        setSearchId={setSearchId}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        filterDate={filterDate}
        setFilterDate={setFilterDate}
        setCurrentPage={setCurrentPage}
      />
      <OrdersTable orders={paginatedOrders} total={filteredOrders.length} />
      <FashionPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}