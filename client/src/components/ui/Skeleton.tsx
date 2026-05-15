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
        shimmer 
        ${variantClasses[variant]} 
        ${className}
      `}
    />
  );
};

export const CardSkeleton = () => (
  <div className="card-ios p-5 bg-white border-slate-200/40 shadow-sm flex items-center gap-4">
    <Skeleton className="w-10 h-10 shrink-0" />
    <div className="flex-1 space-y-2">
      <Skeleton variant="text" className="w-1/2 h-2" />
      <Skeleton variant="text" className="w-1/3 h-4" />
    </div>
  </div>
);

export const VolumeSkeleton = () => (
    <div className="card-ios p-6 space-y-4 bg-white border-slate-200/40 shadow-sm">
        <div className="flex justify-between items-center">
            <Skeleton variant="text" className="w-24 h-2" />
            <Skeleton variant="text" className="w-16 h-4" />
        </div>
        <Skeleton className="w-full h-1" />
    </div>
);

export const MemberCardSkeleton = () => (
    <div className="card-ios overflow-hidden flex flex-col sm:flex-row bg-white border-slate-200/40 shadow-sm h-auto sm:h-[240px]">
        {/* LEFT PROFILE SKELETON */}
        <div className="sm:w-[35%] p-8 flex flex-col items-center justify-center bg-slate-50/50 border-r border-slate-200/30 space-y-5">
            <div className="relative">
                <Skeleton className="w-20 h-20 rounded-2xl" />
                <Skeleton className="absolute -top-2 -right-2 w-8 h-8 rounded-full border-2 border-white" />
            </div>
            <div className="w-full space-y-2">
                <Skeleton variant="text" className="w-full h-4 mx-auto" />
                <Skeleton variant="text" className="w-2/3 h-2 mx-auto" />
            </div>
            <Skeleton variant="text" className="w-1/2 h-6 mx-auto mt-2" />
        </div>
        
        {/* RIGHT METRICS SKELETON */}
        <div className="flex-1 p-8 flex flex-col justify-between space-y-6">
            <div className="grid grid-cols-2 gap-4">
                <Skeleton className="h-16 rounded-2xl" />
                <Skeleton className="h-16 rounded-2xl" />
            </div>
            <div className="space-y-3">
                <div className="flex justify-between">
                    <Skeleton variant="text" className="w-1/4 h-2" />
                    <Skeleton variant="text" className="w-1/4 h-2" />
                </div>
                <Skeleton className="w-full h-2 rounded-full" />
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                <Skeleton variant="text" className="w-1/3 h-3" />
                <Skeleton className="w-20 h-6 rounded-lg" />
            </div>
        </div>
    </div>
);
