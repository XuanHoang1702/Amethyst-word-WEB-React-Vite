import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, MessageCircle, Share2, Facebook, Twitter, Instagram, Mail, Copy, User, Calendar, Tag, Heart, ShoppingBag, Clock, ChevronRight } from 'lucide-react';
import { FaArrowRight } from 'react-icons/fa';
import BlogHeader from '../../components/layout/BlogHeader';
import BlogSidebar from '../../components/layout/BlogSideBar';
import BlogFooter from '../../components/layout/BlogFooters';
import { relatedProducts } from '../../service/ProductData';
import ProductRelateCard from '../products/related/ProductRelateCard';
import img1 from '../../assets/image/sale04.jpg'
const BlogPostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ name: '', email: '', content: '' });
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(24);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
 
    setIsLoading(true);
    setError(null);
    if (!id) {
      setError('ID bài viết không hợp lệ');
      setIsLoading(false);
      return;
    }
    
    try {
      setTimeout(() => {

        const postData = {
          id: parseInt(id),
          title: 'Xu hướng thời trang mùa hè 2025: Tươi mới và Bền vững',
          subtitle: 'Khám phá những phong cách mới nhất cho mùa hè năm nay từ các sàn diễn thời trang hàng đầu',
          content: `
            <p>Mùa hè năm 2025 đang đến gần và các nhà thiết kế thời trang hàng đầu đã giới thiệu những bộ sưu tập với nhiều xu hướng mới mẻ và thú vị. Đây là thời điểm để cập nhật tủ đồ của bạn với những phong cách hot nhất.</p>
            
            <h2>1. Thời trang bền vững lên ngôi</h2>
            <p>Không chỉ là một xu hướng tạm thời, thời trang bền vững đang trở thành tiêu chuẩn mới trong ngành công nghiệp thời trang. Các thương hiệu lớn đều đang chuyển hướng sang sử dụng những chất liệu thân thiện với môi trường và quy trình sản xuất có trách nhiệm.</p>
            <p>Vải tái chế, cotton hữu cơ và các sợi tự nhiên như linen, hemp đang được ưa chuộng hơn bao giờ hết. Không chỉ thân thiện với môi trường, những chất liệu này còn mang lại cảm giác thoáng mát, rất phù hợp cho mùa hè.</p>
            
            <!-- Nội dung đầy đủ... -->
          `,
          category: 'Xu hướng thời trang',
          tags: ['Thời trang mùa hè', 'Xu hướng 2025', 'Thời trang bền vững', 'Phong cách'],
          author: {
            name: 'Nguyễn Thị Minh',
            avatar: img1,
            bio: 'Chuyên gia thời trang với hơn 10 năm kinh nghiệm trong ngành. Thường xuyên đưa ra những phân tích sâu sắc về xu hướng thời trang toàn cầu.'
          },
          date: '2025-04-20',
          image: img1,
          views: 1254,
          rating: 4.8,
          commentCount: 24,
          relatedProductIds: [101, 102, 103, 104, 105, 106]
        };
        setPost(postData);
   
        const commentsData = [
        ];
        setComments(commentsData);
        setIsLoading(false);
      }, 1000);
    } catch (err) {
      setError('Có lỗi xảy ra khi tải dữ liệu bài viết');
      setIsLoading(false);
      console.error('Error fetching post data:', err);
    }
  }, [id]);

  

  if (isLoading) {
    return (
      <div>
        <BlogHeader />
        <div className="container mx-auto px-4 py-16 flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
        <BlogFooter />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <BlogHeader />
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Lỗi</h2>
          <p className="text-red-500">{error}</p>
          <Link to="/blog" className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Quay lại Blog
          </Link>
        </div>
        <BlogFooter />
      </div>
    );
  }

  if (!post) {
    return (
      <div>
        <BlogHeader />
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Bài viết không tồn tại</h2>
          <Link to="/blog" className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Quay lại Blog
          </Link>
        </div>
        <BlogFooter />
      </div>
    );
  }
  const handleCommentChange = (e) => {
    const { name, value } = e.target;
    setNewComment(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    
    if (!newComment.name || !newComment.email || !newComment.content) {
      alert('Vui lòng điền đầy đủ thông tin.');
      return;
    }
    const newCommentObj = {
      id: comments.length + 1,
      name: newComment.name,
      date: new Date().toISOString().split('T')[0],
      content: newComment.content,
      rating: rating
    };
    setComments(prev => [newCommentObj, ...prev]);
    setNewComment({ name: '', email: '', content: '' });
    setRating(0);
  };
  const handleLikeClick = () => {
    if (liked) {
      setLikeCount(prev => prev - 1);
    } else {
      setLikeCount(prev => prev + 1);
    }
    setLiked(!liked);
  };

  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setLinkCopied(true);
    setTimeout(() => {
      setLinkCopied(false);
      setShowShareOptions(false);
    }, 2000);
  };

  return (
    <div>
      <BlogHeader />
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-8">
          <Link to="/blog" className="flex items-center mb-4 text-blue-600 hover:underline">
            <ArrowLeft className="w-4 h-4 mr-1" /> Quay lại Blog
          </Link>

          <img src={post.image} alt={post.title} className="rounded-lg w-full mb-4" />

          <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
          <p className="text-gray-600 mb-4">{post.subtitle}</p>

          <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
            <div className="flex items-center"><User className="w-4 h-4 mr-1" /> {post.author.name}</div>
            <div className="flex items-center"><Calendar className="w-4 h-4 mr-1" /> {post.date}</div>
            <div className="flex items-center"><Clock className="w-4 h-4 mr-1" /> {post.views} lượt xem</div>
          </div>

          <div className="prose max-w-none mb-8" dangerouslySetInnerHTML={{ __html: post.content }} />

          <div className="flex items-center gap-4 mb-8">
            <button
              className={`flex items-center gap-1 ${liked ? 'text-red-500' : 'text-gray-600'}`}
              onClick={handleLikeClick}
            >
              <Heart className="w-5 h-5" /> {likeCount}
            </button>

            <button
              className="flex items-center gap-1 text-gray-600"
              onClick={() => setShowShareOptions(prev => !prev)}
            >
              <Share2 className="w-5 h-5" /> Chia sẻ
            </button>

            {showShareOptions && (
              <div className="flex gap-3 bg-gray-100 p-2 rounded-md">
                <Facebook className="w-5 h-5 text-blue-600 cursor-pointer" />
                <Twitter className="w-5 h-5 text-blue-400 cursor-pointer" />
                <Instagram className="w-5 h-5 text-pink-500 cursor-pointer" />
                <Mail className="w-5 h-5 cursor-pointer" />
                <Copy className="w-5 h-5 cursor-pointer" onClick={copyLinkToClipboard} />
                {linkCopied && <span className="text-sm text-green-500">Đã sao chép!</span>}
              </div>
            )}
          </div>
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag, index) => (
              <span key={index} className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded flex items-center gap-1">
                <Tag className="w-4 h-4" /> {tag}
              </span>
            ))}
          </div>
          <h2 className="text-2xl font-semibold mb-4">Bình luận ({comments.length})</h2>
          <form onSubmit={handleSubmitComment} className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                name="name"
                placeholder="Tên của bạn"
                value={newComment.name}
                onChange={handleCommentChange}
                className="border p-2 rounded w-full"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={newComment.email}
                onChange={handleCommentChange}
                className="border p-2 rounded w-full"
              />
            </div>
            <textarea
              name="content"
              placeholder="Viết bình luận..."
              value={newComment.content}
              onChange={handleCommentChange}
              className="border p-2 rounded w-full mb-4"
              rows="4"
            />
            <div className="flex items-center gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-5 h-5 cursor-pointer ${rating >= star ? 'text-yellow-400' : 'text-gray-400'}`}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  onClick={() => setRating(star)}
                  fill={hoveredRating >= star || rating >= star ? 'currentColor' : 'none'}
                />
              ))}
            </div>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Gửi bình luận
            </button>
          </form>

          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment.id} className="border rounded p-4">
                <div className="flex justify-between mb-2 text-sm text-gray-500">
                  <span>{comment.name}</span>
                  <span>{comment.date}</span>
                </div>
                <p className="mb-2">{comment.content}</p>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className={`w-4 h-4 ${comment.rating >= star ? 'text-yellow-400' : 'text-gray-300'}`} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-4">
          <BlogSidebar 
            popularPosts={[post].filter(Boolean)} 
            categories={['Thời trang', 'Phong cách', 'Mùa hè', 'Xu hướng']} 
          />
        </div>
      </div>
 <div className="bg-gray-100 py-12">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Sản Phẩm Nổi Bật</h2>
              <a href="/shop" className="flex items-center text-blue-500 hover:underline">
                Xem tất cả <ChevronRight size={16} />
              </a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(product => (
                <ProductRelateCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>

      <BlogFooter />
    </div>
  );
};

export default BlogPostDetail;