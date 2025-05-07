  // import { ChevronRight } from 'lucide-react';
  // import { orderData } from '../../../service/profileData';

  // export default function OrdersTab() {
  //   return (
  //     <div>
  //       <h1 className="text-2xl font-bold text-slate-800 mb-6">Đơn hàng của tôi</h1>
        
  //       <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
  //         <div className="overflow-x-auto">
  //           <table className="min-w-full divide-y divide-slate-200">
  //             <thead className="bg-slate-50">
  //               <tr>
  //                 <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Mã đơn hàng</th>
  //                 <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Ngày mua</th>
  //                 <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Tổng tiền</th>
  //                 <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Trạng thái</th>
  //                 <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"></th>
  //               </tr>
  //             </thead>
  //             <tbody className="bg-white divide-y divide-slate-200">
  //               {orderData.map((order, index) => (
  //                 <tr key={index} className="hover:bg-slate-50 transition">
  //                   <td className="px-6 py-5 whitespace-nowrap text-sm font-medium text-indigo-600">{order.id}</td>
  //                   <td className="px-6 py-5 whitespace-nowrap text-sm text-slate-500">{order.date}</td>
  //                   <td className="px-6 py-5 whitespace-nowrap text-sm font-medium text-slate-800">{order.total}</td>
  //                   <td className="px-6 py-5 whitespace-nowrap">
  //                     <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${order.statusColor}`}>
  //                       {order.status}
  //                     </span>
  //                   </td>
  //                   <td className="px-6 py-5 whitespace-nowrap text-right text-sm font-medium">
  //                     <button className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center">
  //                       Chi tiết
  //                       <ChevronRight size={16} className="ml-1" />
  //                     </button>
  //                   </td>
  //                 </tr>
  //               ))}
  //             </tbody>
  //           </table>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  import { useState } from 'react';
import { orderData } from '../../../../service/profileData';
import OrdersFilter from './OrdersFilter';
import OrdersTable from './OrderTable';
import Pagination from './Pagination';

const ORDERS_PER_PAGE = 10;

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

  const totalPages = Math.ceil(filteredOrders.length / ORDERS_PER_PAGE);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ORDERS_PER_PAGE,
    currentPage * ORDERS_PER_PAGE
  );

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
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
