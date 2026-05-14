import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface ActivityPoint {
  name: string;
  prs: number;
}

interface GraphicActivityProps {
  data?: ActivityPoint[];
}

const prStatusData = [
  { name: "Merged", value: 142 },
  { name: "Open", value: 12 },
  { name: "Draft", value: 8 },
];

// Using high-fidelity colors from our design system
const COLORS = ["#2563eb", "#16a34a", "#9333ea"];

export default function GraphicActivity({ data }: GraphicActivityProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* PR Activity Bar Chart */}
      <section className="lg:col-span-2 bg-white/70 backdrop-blur-[var(--blur-ios)] p-10 rounded-[40px] border border-white/50 shadow-ios">
        <div className="mb-8">
          <h3 className="text-2xl font-black text-hestia-text tracking-tight">
            Development Velocity
          </h3>
          <p className="text-hestia-muted font-bold uppercase text-xs tracking-widest mt-1">
            Weekly PR creation frequency
          </p>
        </div>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#64748b', fontSize: 13, fontWeight: 700 }}
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#64748b', fontSize: 13, fontWeight: 700 }}
              />
              <Tooltip 
                cursor={{ fill: '#f8fafc' }}
                contentStyle={{ 
                  borderRadius: '24px', 
                  border: 'none', 
                  boxShadow: 'var(--shadow-ios-lg)',
                  fontWeight: '900',
                  color: '#0d0907'
                }}
              />
              <Bar dataKey="prs" fill="#2563eb" radius={[12, 12, 0, 0]} barSize={48} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* PR Status Pie Chart */}
      <section className="bg-white/70 backdrop-blur-[var(--blur-ios)] p-10 rounded-[40px] border border-white/50 shadow-ios flex flex-col">
        <div className="mb-8">
          <h3 className="text-2xl font-black text-hestia-text tracking-tight">
            Status Mix
          </h3>
          <p className="text-hestia-muted font-bold uppercase text-xs tracking-widest mt-1">
            Current lifecycle distribution
          </p>
        </div>
        <div className="h-[250px] w-full flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={prStatusData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={95}
                paddingAngle={10}
                dataKey="value"
                cornerRadius={12}
              >
                {prStatusData.map((_entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    stroke="none"
                  />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  borderRadius: '24px', 
                  border: 'none', 
                  boxShadow: 'var(--shadow-ios-lg)',
                  fontWeight: '900'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-3 gap-2 pt-6 border-t border-hestia-bg/50">
          {prStatusData.map((item, index) => (
            <div key={item.name} className="flex flex-col items-center gap-1">
              <div className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: COLORS[index] }} />
              <span className="text-[10px] font-black text-hestia-muted uppercase tracking-widest">{item.name}</span>
              <span className="text-sm font-black text-hestia-text">{item.value}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
