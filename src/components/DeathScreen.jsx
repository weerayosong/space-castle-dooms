import { useGame } from '../context/GameContext'

const DeathScreen = () => {
    const {
        isDead,
        setIsDead,
        playerName,
        setO2,
        setPos,
        setDiscovered,
        addLog,
    } = useGame()

    // ถ้ายังไม่ตาย ก็ไม่ต้องเรนเดอร์อะไรออกมา (คืนค่า null)
    if (!isDead) return null

    // ฟังก์ชันชุบชีวิต (ลูปนรก)
    const wakeUpLoop = () => {
        setIsDead(false)
        setO2(100)
        setPos({ x: 0, y: 0 })
        setDiscovered(new Set(['0,0']))
        addLog(
            <>
                ตื่นขึ้นมาอีกครั้ง...{' '}
                <span className="text-gray-400 italic">นี่มันลูปนรกชัดๆ</span>
            </>,
        )
    }

    return (
        <div className="absolute inset-0 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center z-50 p-8 text-center border border-red-200 fade-in sm:rounded-sm">
            <h1 className="text-4xl font-black mb-2 uppercase text-red-600 tracking-widest font-sans">
                FATAL ERROR
            </h1>
            <p className="text-sm mb-12 text-gray-600 font-bold border-t border-red-100 pt-4 font-sans leading-relaxed">
                Lt. {playerName || 'yosong'} ขาดอากาศหายใจ
                <br />
                สติสัมปชัญญะกำลังดับลง...
            </p>
            <button
                onClick={wakeUpLoop}
                className="w-full max-w-60 py-4 border-none bg-red-600 text-white font-bold uppercase tracking-widest font-sans hover:bg-red-700 transition-colors active:scale-95 rounded-sm shadow-md z-10"
            >
                [ WAKE UP ]
            </button>
        </div>
    )
}

export default DeathScreen
