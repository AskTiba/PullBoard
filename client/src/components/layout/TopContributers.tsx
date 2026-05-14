interface Contributor {
  name: string;
  count: number;
  avatar: string;
}

interface TopContributersProps {
  contributors?: Contributor[];
}

export default function TopContributers({ contributors }: TopContributersProps) {
  return (
    <section className="space-y-8 pb-12">
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <h3 className="text-3xl font-bold text-hestia-text tracking-tight">
            Top Contributors
          </h3>
          <p className="text-hestia-muted font-medium">Leading the development charge</p>
        </div>
        <button className="text-sm font-bold text-hestia-accent hover:underline decoration-2 underline-offset-4">
          View Full Leaderboard
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {contributors?.map((contributor, index) => (
          <div 
            key={index} 
            className="group relative bg-white p-8 rounded-[40px] border border-white shadow-ios hover:shadow-ios-lg transition-all duration-300"
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="relative">
                <div className="w-20 h-20 bg-hestia-bg rounded-[28px] border-2 border-white shadow-ios flex items-center justify-center text-2xl font-black text-hestia-accent group-hover:scale-110 transition-transform duration-500">
                  {contributor.avatar}
                </div>
                <div className="absolute -bottom-2 -right-2 bg-hestia-text text-white w-8 h-8 rounded-full border-4 border-white flex items-center justify-center text-xs font-black">
                  #{index + 1}
                </div>
              </div>
              
              <div className="space-y-1">
                <h4 className="text-xl font-bold text-hestia-text">{contributor.name}</h4>
                <div className="px-4 py-1.5 bg-hestia-bg rounded-full text-xs font-bold text-hestia-muted uppercase tracking-widest border border-white/50">
                  {contributor.count} Merged PRs
                </div>
              </div>

              <div className="w-full pt-4">
                <div className="h-1.5 w-full bg-hestia-bg rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-hestia-accent rounded-full transition-all duration-1000 delay-300" 
                    style={{ width: `${(contributor.count / 50) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
