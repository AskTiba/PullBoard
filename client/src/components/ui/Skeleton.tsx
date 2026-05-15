import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'rectangular' | 'circular' | 'text';
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '', variant = 'rectangular' }) => {
  const variantClasses = {
    rectangular: 'rounded-2xl',
    circular: 'rounded-full',
    text: 'rounded-lg h-4 w-3/4'
  };

  return (
    <div 
      className={`
        animate-pulse bg-slate-200/50 
        ${variantClasses[variant]} 
        ${className}
      `}
    />
  );
};

export const CardSkeleton = () => (
  <div className="card-ios p-5 bg-white border-slate-200/60 shadow-sm flex items-center gap-4">
    <Skeleton className="w-10 h-10 shrink-0" />
    <div className="flex-1 space-y-2">
      <Skeleton variant="text" className="w-1/2 h-2" />
      <Skeleton variant="text" className="w-1/3 h-4" />
    </div>
  </div>
);

export const VolumeSkeleton = () => (
    <div className="card-ios p-6 space-y-4 bg-white border-slate-200/60 shadow-sm">
        <div className="flex justify-between items-center">
            <Skeleton variant="text" className="w-24 h-2" />
            <Skeleton variant="text" className="w-16 h-4" />
        </div>
        <Skeleton className="w-full h-1" />
    </div>
);

export const MemberCardSkeleton = () => (
    <div className="card-ios overflow-hidden flex flex-col sm:row bg-white border-slate-200 shadow-sm h-[200px]">
        <div className="sm:w-[35%] p-6 flex flex-col items-center justify-center bg-slate-50 border-r space-y-4 h-full">
            <Skeleton className="w-16 h-16" />
            <Skeleton variant="text" className="w-20 h-4" />
        </div>
        <div className="flex-1 p-6 flex flex-col justify-between space-y-5">
            <div className="grid grid-cols-2 gap-3">
                <Skeleton className="h-14 rounded-xl" />
                <Skeleton className="h-14 rounded-xl" />
            </div>
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-20 h-4" />
        </div>
    </div>
);
