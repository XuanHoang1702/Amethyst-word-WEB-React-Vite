import img1 from '../assets/image/blogfashion.jpeg';
import img2 from '../assets/image/tải xuống (1).jpg';
import img3 from '../assets/image/ffff.jpg';
import img4 from '../assets/image/127d4373-a118-4c5a-a210-98f6165e6a23.jpeg';
import img5  from '../assets/image/短_踝靴 - momo購物網.jpg'
import img6 from '../assets/image/Trendy Clothing & Fashion.jpeg'
import img7 from "../assets/image/Women's Fashion Online Shopping.jpg"
import img8 from '../assets/image/Молодая женщина в черном платье и солнцезащитных очках держит сумки на розовом фоне _ Премиум Фото.jpeg'
import img9 from '../assets/image/tải xuống.jpg'
import img10 from '../assets/image/tải xuống (2).jpg'
import img11 from '../assets/image/the new neutral.jpg'
import img12 from '../assets/image/tải xuống (3).jpg'
import img13 from '../assets/image/tải xuống (4).jpg'
import img14 from '../assets/image/tải xuống (5).jpg'
import img15 from '../assets/image/tải xuống (6).jpg'
import img16 from '../assets/image/tải xuống (7).jpg'
import img17 from '../assets/image/tải xuống (8).jpg'
import img18 from '../assets/image/tải xuống (9).jpg'
import img19 from '../assets/image/tải xuống (10).jpg'
import img20 from '../assets/image/tải xuống (11).jpg'
const samplePosts = [
  {
    id: 1,
    title: 'Phong cách minimalism đang trở lại',
    excerpt: 'Sự đơn giản, tinh tế và tối ưu đang là xu hướng thời trang được yêu thích.',
    category: 'Xu hướng thời trang',
    author: 'Nguyễn Thị Hoa',
    date: '2025-05-01',
    image: img1,
    rating: 4.7,
    commentCount: 12,
    relatedProductIds: [201, 202, 203],
  },
  {
    id: 2,
    title: 'Màu pastel và xu hướng thời trang năm 2025',
    excerpt: 'Màu pastel mang lại sự nhẹ nhàng và nữ tính cho mùa xuân.',
    category: 'Mẹo phối đồ',
    author: 'Lê Quốc Bảo',
    date: '2025-04-28',
    image: img2,
    rating: 4.6,
    commentCount: 18,
    relatedProductIds: [204, 205, 206],
  },
  {
    id: 3,
    title: 'Lịch sử phát triển của thời trang hip hop',
    excerpt: 'Từ đường phố đến sàn diễn, hip hop đã thay đổi thế giới thời trang.',
    category: 'Lịch sử thời trang',
    author: 'Phạm Nhật Minh',
    date: '2025-04-25',
    image: img3,
    rating: 4.8,
    commentCount: 22,
    relatedProductIds: [207, 208, 209],
  },
  {
    id: 4,
    title: 'Cách chọn giày thể thao phù hợp phong cách cá nhân',
    excerpt: 'Không chỉ là giày – đó là tuyên ngôn phong cách.',
    category: 'Hướng dẫn mua sắm',
    author: 'Trần Lê Quân',
    date: '2025-04-20',
    image: img4,
    rating: 4.5,
    commentCount: 19,
    relatedProductIds: [210, 211, 212],
  },
  {
    id: 5,
    title: 'Mẹo chọn kính râm phù hợp khuôn mặt',
    excerpt: 'Kính không chỉ để che nắng mà còn làm đẹp thêm cá tính.',
    category: 'Mẹo phối đồ',
    author: 'Ngô Hồng Nhung',
    date: '2025-04-19',
    image: img5,
    rating: 4.2,
    commentCount: 14,
    relatedProductIds: [213, 214, 215],
  },
  {
    id: 6,
    title: 'Thời trang Gen Z: Cá tính và bùng nổ',
    excerpt: 'Gen Z đang thay đổi hoàn toàn quan điểm về cái đẹp.',
    category: 'Xu hướng thời trang',
    author: 'Vũ Minh Anh',
    date: '2025-04-17',
    image: img6,
    rating: 4.9,
    commentCount: 33,
    relatedProductIds: [216, 217, 218],
  },
  {
    id: 7,
    title: 'Bí quyết chọn áo sơ mi không bao giờ lỗi mốt',
    excerpt: 'Sơ mi trắng luôn là lựa chọn an toàn nhưng đầy sức hút.',
    category: 'Hướng dẫn mua sắm',
    author: 'Lê Ngọc Hân',
    date: '2025-04-16',
    image: img7,
    rating: 4.4,
    commentCount: 17,
    relatedProductIds: [219, 220, 221],
  },
  {
    id: 8,
    title: 'Phối đồ công sở không nhàm chán',
    excerpt: 'Công sở nhưng vẫn nổi bật và cá tính.',
    category: 'Mẹo phối đồ',
    author: 'Đặng Quang Huy',
    date: '2025-04-15',
    image: img8,
    rating: 4.3,
    commentCount: 11,
    relatedProductIds: [222, 223, 224],
  },
  {
    id: 9,
    title: 'Vải denim - biểu tượng của sự nổi loạn',
    excerpt: 'Denim chưa bao giờ lỗi thời và luôn có sức hút mạnh mẽ.',
    category: 'Lịch sử thời trang',
    author: 'Nguyễn Hải Yến',
    date: '2025-04-14',
    image: img9,
    rating: 4.6,
    commentCount: 26,
    relatedProductIds: [225, 226, 227],
  },
  {
    id: 10,
    title: 'Cách bảo quản áo khoác mùa đông đúng cách',
    excerpt: 'Giữ áo khoác như mới suốt nhiều mùa lạnh.',
    category: 'Bảo quản quần áo',
    author: 'Trần Minh Châu',
    date: '2025-04-12',
    image: img10,
    rating: 4.5,
    commentCount: 13,
    relatedProductIds: [228, 229, 230],
  },
  {
    id: 11,
    title: 'Túi xách mini - phụ kiện không thể thiếu',
    excerpt: 'Dù nhỏ nhưng có võ – túi mini là xu hướng hot.',
    category: 'Xu hướng thời trang',
    author: 'Phạm Thị Linh',
    date: '2025-04-10',
    image: img11,
    rating: 4.7,
    commentCount: 29,
    relatedProductIds: [231, 232, 233],
  },
  {
    id: 12,
    title: 'Học cách phối đồ từ street style Nhật Bản',
    excerpt: 'Sáng tạo, phá cách và độc đáo là những gì bạn cần học hỏi.',
    category: 'Chia sẻ từ người nổi tiếng',
    author: 'Hồ Nhật Nam',
    date: '2025-04-09',
    image: img12,
    rating: 4.8,
    commentCount: 24,
    relatedProductIds: [234, 235, 236],
  },
  {
    id: 13,
    title: 'Chọn chất liệu vải phù hợp với từng mùa',
    excerpt: 'Chất liệu quyết định sự thoải mái và phong cách.',
    category: 'Hướng dẫn mua sắm',
    author: 'Bùi Thu Thảo',
    date: '2025-04-08',
    image: img13,
    rating: 4.3,
    commentCount: 9,
    relatedProductIds: [237, 238, 239],
  },
  {
    id: 14,
    title: 'Áo hoodie và sự tiện dụng trong thời trang thường ngày',
    excerpt: 'Phong cách trẻ trung, năng động và dễ phối.',
    category: 'Xu hướng thời trang',
    author: 'Ngô Trung Kiên',
    date: '2025-04-07',
    image: img14,
    rating: 4.5,
    commentCount: 16,
    relatedProductIds: [240, 241, 242],
  },
  {
    id: 15,
    title: '5 mẫu giày thể thao bạn nên có trong tủ đồ',
    excerpt: 'Giày thể thao phù hợp giúp bạn tự tin và thoải mái.',
    category: 'Hướng dẫn mua sắm',
    author: 'Trịnh Hồng Quân',
    date: '2025-04-06',
    image: img15,
    rating: 4.6,
    commentCount: 20,
    relatedProductIds: [243, 244, 245],
  },
  {
    id: 16,
    title: 'Phong cách vintage trở lại mạnh mẽ',
    excerpt: 'Sự hoài cổ đầy sang trọng đang "làm mưa làm gió".',
    category: 'Lịch sử thời trang',
    author: 'Đoàn Thanh Phong',
    date: '2025-04-05',
    image: img16,
    rating: 4.9,
    commentCount: 34,
    relatedProductIds: [246, 247, 248],
  },
  {
    id: 17,
    title: 'Thời trang công nghệ cao – bạn đã sẵn sàng?',
    excerpt: 'Sự kết hợp giữa công nghệ và thời trang mang đến trải nghiệm mới lạ.',
    category: 'Xu hướng thời trang',
    author: 'Lý Trần Huy',
    date: '2025-04-04',
    image: img17,
    rating: 4.8,
    commentCount: 21,
    relatedProductIds: [249, 250, 251],
  },
  {
    id: 18,
    title: 'Phụ kiện không thể thiếu trong mùa hè',
    excerpt: 'Nón, mắt kính, sandal – tất cả tạo nên một mùa hè sành điệu.',
    category: 'Mẹo phối đồ',
    author: 'Võ Mai Thảo',
    date: '2025-04-03',
    image: img18,
    rating: 4.4,
    commentCount: 10,
    relatedProductIds: [252, 253, 254],
  },
  {
    id: 19,
    title: 'Sự khác biệt giữa thời trang nhanh và bền vững',
    excerpt: 'Lựa chọn thông minh cho tương lai môi trường.',
    category: 'Lịch sử thời trang',
    author: 'Dương Tuấn Kiệt',
    date: '2025-04-02',
    image: img19,
    rating: 4.2,
    commentCount: 8,
    relatedProductIds: [255, 256, 257],
  },
  {
    id: 20,
    title: 'Mẹo phối đồ với quần jean dáng rộng',
    excerpt: 'Jean ống rộng đang trở lại mạnh mẽ, nhưng bạn đã biết phối chưa?',
    category: 'Mẹo phối đồ',
    author: 'Tạ Nhật Hà',
    date: '2025-04-01',
    image: img20,
    rating: 4.5,
    commentCount: 13,
    relatedProductIds: [258, 259, 260],
  },
];

export default samplePosts;
