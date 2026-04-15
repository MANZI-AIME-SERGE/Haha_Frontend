const Skeleton = ({ className = '', variant = 'text' }) => {
  const baseClasses = 'animate-shimmer rounded-lg';
  
  const variants = {
    text: 'h-4 w-full',
    title: 'h-6 w-3/4',
    avatar: 'h-12 w-12 rounded-full',
    thumbnail: 'h-48 w-full rounded-xl',
    card: 'h-64 w-full rounded-2xl',
  };

  return (
    <div className={`${baseClasses} ${variants[variant]} ${className}`} />
  );
};

export const ProductCardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-soft">
      <Skeleton variant="thumbnail" className="h-56" />
      <div className="p-5 space-y-4">
        <div className="space-y-2">
          <Skeleton variant="title" className="h-5 w-3/4" />
          <Skeleton variant="text" className="h-4 w-1/2" />
        </div>
        <Skeleton variant="text" className="h-4 w-full" />
        <Skeleton variant="text" className="h-4 w-2/3" />
        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
          <div className="space-y-1">
            <Skeleton variant="text" className="h-3 w-12" />
            <Skeleton variant="text" className="h-6 w-20" />
          </div>
          <Skeleton variant="text" className="h-10 w-24 rounded-xl" />
        </div>
      </div>
    </div>
  );
};

export const ProductGridSkeleton = ({ count = 8 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </>
  );
};

export const SupermarketCardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl shadow-soft p-6 border border-gray-100 flex items-center gap-5">
      <Skeleton variant="avatar" className="w-20 h-20 rounded-2xl" />
      <div className="flex-1 space-y-3">
        <Skeleton variant="title" className="h-6 w-1/2" />
        <Skeleton variant="text" className="h-4 w-1/3" />
        <Skeleton variant="text" className="h-4 w-1/4" />
      </div>
      <Skeleton variant="text" className="h-10 w-24 rounded-xl" />
    </div>
  );
};

export const StatCardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl shadow-soft p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <Skeleton variant="text" className="h-4 w-24" />
        <Skeleton variant="avatar" className="w-12 h-12 rounded-xl" />
      </div>
      <Skeleton variant="title" className="h-8 w-20 mb-2" />
      <Skeleton variant="text" className="h-3 w-16" />
    </div>
  );
};

export const DashboardSkeleton = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-soft p-6 border border-gray-100">
          <Skeleton variant="title" className="h-6 w-40 mb-4" />
          <Skeleton variant="card" className="h-72" />
        </div>
        <div className="bg-white rounded-2xl shadow-soft p-6 border border-gray-100">
          <Skeleton variant="title" className="h-6 w-40 mb-4" />
          <Skeleton variant="card" className="h-72" />
        </div>
      </div>
    </div>
  );
};

export const TableRowSkeleton = () => {
  return (
    <div className="flex items-center gap-4 p-4 border-b border-gray-50">
      <Skeleton variant="avatar" className="w-10 h-10 rounded-lg" />
      <div className="flex-1 space-y-2">
        <Skeleton variant="text" className="h-4 w-1/3" />
        <Skeleton variant="text" className="h-3 w-1/4" />
      </div>
      <Skeleton variant="text" className="h-4 w-20" />
      <Skeleton variant="text" className="h-4 w-24 rounded-full" />
      <Skeleton variant="text" className="h-8 w-16 rounded-lg" />
    </div>
  );
};

export default Skeleton;
