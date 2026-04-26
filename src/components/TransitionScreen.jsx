import { useGame } from '../context/GameContext'

const TransitionScreen = () => {
    const { level, isTransitioning } = useGame()

    if (!isTransitioning) return null

    const nextLevel = level + 1
    const hazardPct = Math.floor(Math.min(0.2 + nextLevel * 0.02, 0.45) * 100)
    const extraDmg = Math.min(15, Math.floor(nextLevel * 1.5))

    return (
        <div className="absolute inset-0 bg-white flex flex-col items-center justify-center z-40 p-8 text-center text-gray-900 border border-gray-200 fade-in overflow-hidden sm:rounded-sm">
            <div className="animate-pulse mb-8 z-10">
                <h2 className="text-xs tracking-[0.2em] text-gray-400 mb-2 font-sans font-bold">
                    กำลังลดระดับชั้น
                </h2>
                <h1 className="text-5xl font-black text-gray-900 tracking-widest font-sans border-b-2 border-gray-200 pb-4">
                    DECK {nextLevel}
                </h1>
            </div>

            <div className="space-y-3 font-sans text-[11px] sm:text-xs z-10 w-full max-w-62.5 font-bold">
                <div className="text-gray-900 border border-gray-300 bg-gray-100 px-4 py-3 text-left flex justify-between rounded-sm">
                    <span>
                        ฟื้นฟูระบบพยุงชีพ{' '}
                        <span className="font-black">
                            (O<sub>2</sub>)
                        </span>
                    </span>
                    <span className="font-black">+30%</span>
                </div>
                <div className="text-red-600 border border-red-200 bg-red-50 px-4 py-3 text-left flex flex-col gap-1 rounded-sm">
                    <div className="flex justify-between">
                        <span>ระดับภัยคุกคาม:</span>{' '}
                        <span>หนาแน่น {hazardPct}%</span>
                    </div>
                    <div className="flex justify-between">
                        <span>ความเสียหายสูงสุด:</span> <span>+{extraDmg}</span>
                    </div>
                </div>
                <div className="text-gray-400 border border-gray-200 bg-gray-50 px-4 py-3 text-center tracking-widest mt-4 rounded-sm">
                    [ มันต้องมีสิ! Escape Pod ]
                </div>
            </div>
        </div>
    )
}

export default TransitionScreen
