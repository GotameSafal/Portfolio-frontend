import { GitBranch } from "lucide-react";

const GitHubGridWidget = () => {
  // Generate mock contribution grid colors: shades of green
  const shades = [
    "bg-gray-800",       // 0 commits
    "bg-green-900/40",   // 1-3 commits
    "bg-green-700/60",   // 4-6 commits
    "bg-green-500/80",   // 7-9 commits
    "bg-green-400",      // 10+ commits
  ];

  // We want a 7x22 grid (7 rows for days of week, 22 columns for weeks)
  const columnsCount = 21;
  const rowsCount = 6;
  const gridCells = [];

  for (let c = 0; c < columnsCount; c++) {
    const colCells = [];
    for (let r = 0; r < rowsCount; r++) {
      // Create some pattern or random weight
      const weight = Math.floor(Math.random() * 5);
      colCells.push(weight);
    }
    gridCells.push(colCells);
  }

  return (
    <div
      className="col-span-1 sm:col-span-2 md:col-span-3 bg-gradient-to-br from-slate-900 to-black p-4 flex flex-col justify-between border border-gray-800 rounded-xl relative overflow-hidden"
    >
      <div className="flex justify-between items-center z-10">
        <h4 className="text-xs font-semibold text-white flex items-center gap-1.5">
          <GitBranch size={14} className="text-green-500" />
          GitHub Activities
        </h4>
        <span className="text-[10px] text-gray-500 font-mono">@GotameSafal</span>
      </div>

      <div className="flex-1 flex items-center justify-center my-3 overflow-x-auto scrollbar-none z-10">
        <div className="flex gap-[3px] shrink-0">
          {gridCells.map((col, colIdx) => (
            <div key={colIdx} className="flex flex-col gap-[3px]">
              {col.map((val, rowIdx) => (
                <div
                  key={rowIdx}
                  className={`w-[8px] h-[8px] sm:w-[10px] sm:h-[10px] rounded-[1.5px] transition-colors duration-300 hover:scale-125 cursor-pointer ${shades[val]}`}
                  title={`${val * 2} commits`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center z-10 text-[9px] text-gray-500">
        <span>628 commits this year</span>
        <div className="flex items-center gap-1">
          <span>Less</span>
          <div className="w-[6px] h-[6px] bg-gray-800 rounded-[1px]" />
          <div className="w-[6px] h-[6px] bg-green-900/40 rounded-[1px]" />
          <div className="w-[6px] h-[6px] bg-green-700/60 rounded-[1px]" />
          <div className="w-[6px] h-[6px] bg-green-500/80 rounded-[1px]" />
          <div className="w-[6px] h-[6px] bg-green-400 rounded-[1px]" />
          <span>More</span>
        </div>
      </div>
    </div>
  );
};

export default GitHubGridWidget;
