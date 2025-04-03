import { useParams } from 'react-router-dom';

export default function BlogPostPage() {
  const { id } = useParams();
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold">Blog Post {id}</h1>
      {/* Add your blog post content here */}
    </div>
  );
} 