import { useGame } from '../context/GameContext'

const AchievementsModal = () => {
    const { isAchvOpen, setIsAchvOpen, ACHIEVEMENTS, unlockedAchv, maxDeck } =
        useGame()

    if (!isAchvOpen) return null

    return (
        <div className="absolute inset-0 bg-white/95 backdrop-blur-sm z-40 flex flex-col p-6 overflow-hidden fade-in text-gray-900 rounded-sm">
            {/* ส่วนหัวของ Modal */}
            <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-4 flex-none">
                <h2 className="text-xl font-black text-gray-900 tracking-widest uppercase font-sans">
                    RECORDS
                </h2>
                <button
                    onClick={() => setIsAchvOpen(false)}
                    className="text-xl font-black hover:text-red-600 transition-colors text-gray-400"
                >
                    [ X ]
                </button>
            </div>

            {/* ส่วนสรุปสถิติ */}
            <div className="flex justify-between items-center mb-4 flex-none text-xs font-sans text-gray-500">
                <span>
                    UNLOCKED:{' '}
                    <span className="text-gray-900 font-bold">
                        {unlockedAchv.length}
                    </span>
                    /{ACHIEVEMENTS.length}
                </span>
                <span>
                    MAX DECK:{' '}
                    <span className="text-gray-900 font-bold">{maxDeck}</span>
                </span>
            </div>

            {/* รายการ Achievements */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-2 pb-8">
                {ACHIEVEMENTS.map((a) => {
                    const isUnlocked = unlockedAchv.includes(a.id)
                    return (
                        <div
                            key={a.id}
                            className={`p-3 border flex gap-3 items-center rounded-sm ${isUnlocked ? 'border-gray-300 bg-gray-50 shadow-sm' : 'border-gray-100 bg-white opacity-40'}`}
                        >
                            <div
                                className={`text-sm font-bold font-sans ${isUnlocked ? 'text-gray-900' : 'text-gray-300'}`}
                            >
                                {isUnlocked ? '[UNLOCKED]' : '[ LOCKED ]'}
                            </div>
                            <div className="flex-1">
                                <div
                                    className={`font-bold font-sans uppercase tracking-wider text-xs ${isUnlocked ? 'text-gray-900' : 'text-gray-400'}`}
                                >
                                    {a.name}
                                </div>
                                <div className="text-[10px] text-gray-500 font-sans leading-tight mt-0.5">
                                    {isUnlocked ? a.desc : '???'}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default AchievementsModal
