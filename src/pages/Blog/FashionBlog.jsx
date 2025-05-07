
import React, { useState, useEffect } from 'react';
import { Search, Share2, Star, MessageCircle, ShoppingBag, ChevronRight } from 'lucide-react';
import BlogHeader from '../../components/layout/BlogHeader';
import BlogSidebar from '../../components/layout/BlogSideBar';
import BlogPostCard from './BlogPostCard ';
import BlogCategoryFilter from './BlogCategoryFilter ';
import BlogNewsletterSignup from './BlogNewsletterSignup';
import BlogFooter from '../../components/layout/BlogFooters';
import RelatedProducts from './RealtedProducts';
import Breadcrumb from '../../components/BreadCrumb';
import samplePosts from '../../service/BlogData';

const FashionBlog = () => {
  // State for blog posts, categories, search query, etc.
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [categories, setCategories] = useState([
    'Xu hướng thời trang',
    'Hướng dẫn mua sắm',
    'Lịch sử thời trang',
    'Chia sẻ từ người nổi tiếng',
    'Mẹo phối đồ',
    'Bảo quản quần áo'
  ]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Sample blog posts data (in a real app, this would come from an API)
  useEffect(() => {
    // Simulate API fetch
    const fetchPosts = () => {
      setIsLoading(true);
      setTimeout(() => {
        setPosts(samplePosts);
        setFilteredPosts(samplePosts);
        setIsLoading(false);
      }, 1000);
    };

    fetchPosts();
  }, []);

  // Filter posts by category
  useEffect(() => {
    if (selectedCategory) {
      setFilteredPosts(posts.filter(post => post.category === selectedCategory));
    } else {
      setFilteredPosts(posts);
    }
  }, [selectedCategory, posts]);

  // Search functionality
  useEffect(() => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      setFilteredPosts(
        posts.filter(
          post =>
            post.title.toLowerCase().includes(query) ||
            post.excerpt.toLowerCase().includes(query) ||
            post.category.toLowerCase().includes(query) ||
            post.author.toLowerCase().includes(query)
        )
      );
    } else if (selectedCategory) {
      setFilteredPosts(posts.filter(post => post.category === selectedCategory));
    } else {
      setFilteredPosts(posts);
    }
  }, [searchQuery, posts, selectedCategory]);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle category selection
  const handleCategoryChange = (category) => {
    setSelectedCategory(category === selectedCategory ? '' : category);
  };

  return (
    <div className="pt-[60px]">
    <div className="min-h-screen bg-gray-50">
      {/* <BlogHeader /> */}
      
      {/* Hero Section */}
      <div className="relative">
        <div className="bg-gradient-to-r from-purple-600 to-blue-500 h-64 md:h-96 w-full">
          <img 
            src="/api/placeholder/1920/500" 
            alt="Fashion Blog Hero" 
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <h1 className="text-3xl md:text-5xl font-bold text-center">Blog Thời Trang</h1>
            <p className="text-lg md:text-xl mt-4 text-center max-w-2xl">
              Khám phá xu hướng mới nhất, mẹo phối đồ và hướng dẫn mua sắm thông minh
            </p>
            {/* <Breadcrumb   items={[{ label: 'Sản phẩm yêu thích ' }]} /> */}
        
            
            {/* Search Bar */} 
            <div className="mt-8 w-full max-w-lg relative">
              <input
                type="text"
                placeholder="Tìm kiếm bài viết..."
                className="w-full p-3 pl-10 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row">
          {/* Main Blog Content */}
          <div className="lg:w-3/4 lg:pr-8">
            {/* Category Filter */}
            <BlogCategoryFilter 
              categories={categories} 
              selectedCategory={selectedCategory} 
              onCategoryChange={handleCategoryChange} 
            />
            
            {/* Blog Posts */}
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                {filteredPosts.map(post => (
                  <BlogPostCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <h3 className="text-xl font-medium">Không tìm thấy bài viết nào</h3>
                <p className="mt-2 text-gray-600">Vui lòng thử tìm kiếm hoặc lọc khác</p>
              </div>
            )}
            
            {/* Pagination */}
            <div className="flex justify-center mt-12">
              <nav className="flex items-center space-x-2">
                <button className="px-4 py-2 border rounded-md hover:bg-gray-100">Trước</button>
                <button className="px-4 py-2 border rounded-md bg-blue-500 text-white">1</button>
                <button className="px-4 py-2 border rounded-md hover:bg-gray-100">2</button>
                <button className="px-4 py-2 border rounded-md hover:bg-gray-100">3</button>
                <button className="px-4 py-2 border rounded-md hover:bg-gray-100">Sau</button>
              </nav>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:w-1/4 mt-8 lg:mt-0">
            <BlogSidebar 
              popularPosts={posts.slice(0, 3)} 
              categories={categories}
            />
            <BlogNewsletterSignup />
          </div>
        </div>
      </div>
      
      {/* Featured Products */}
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Sản Phẩm Nổi Bật</h2>
            <a href="/shop" className="flex items-center text-blue-500 hover:underline">
              Xem tất cả <ChevronRight size={16} />
            </a>
          </div>
          <RelatedProducts productIds={[101, 104, 107, 110]} />
        </div>
      </div>
      
      {/* Q&A Section */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-8">Hỏi & Đáp về Thời Trang</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg">Làm thế nào để chọn quần jean phù hợp với dáng người?</h3>
            <p className="text-gray-600 mt-2">Để chọn quần jean phù hợp, bạn cần xác định rõ dáng người của mình. Dáng người quả táo nên chọn quần jean ống đứng, dáng người quả lê phù hợp với quần boot-cut, dáng người đồng hồ cát thì hầu hết các kiểu đều phù hợp.</p>
            <div className="mt-4">
              <a href="#" className="text-blue-500 hover:underline">Xem thêm câu trả lời (3)</a>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg">Màu sắc nào phù hợp với tông da ngăm đen?</h3>
            <p className="text-gray-600 mt-2">Những người có làn da ngăm đen thường rất phù hợp với các màu sắc tương phản như trắng, vàng, cam, đỏ. Các tông màu pastel nhẹ nhàng cũng là lựa chọn tốt để tạo điểm nhấn.</p>
            <div className="mt-4">
              <a href="#" className="text-blue-500 hover:underline">Xem thêm câu trả lời (5)</a>
            </div>
          </div>
        </div>
        <div className="text-center mt-8">
          <button className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition-colors">
            Đặt câu hỏi mới
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default FashionBlog;