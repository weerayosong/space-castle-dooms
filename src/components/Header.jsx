import { useGame } from '../context/GameContext'

const Header = () => {
    const { level, o2 } = useGame()

    // Logic คำนวณสถานะการเต้นของหัวใจ
    let statusText = 'ปกติ'
    let statusColor = 'text-gray-900'

    if (o2 <= 20) {
        statusText = 'วิกฤต!'
        statusColor = 'text-red-600 animate-pulse'
    } else if (o2 <= 50) {
        statusText = 'เต้นเร็ว'
    }

    return (
        <div className="border-b border-gray-200 p-4 flex w-full items-center bg-gray-50 flex-none z-10 sm:rounded-t-sm">
            {/* ซ้าย: Deck */}
            <div className="flex-1 text-left">
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest font-sans">
                    Deck
                </div>
                <div className="text-2xl font-black text-gray-900 font-sans">
                    {level}
                </div>
            </div>

            {/* กลาง: O2 */}
            <div className="flex-1 flex flex-col items-center justify-center text-center">
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest font-sans">
                    ระบบพยุงชีพ{' '}
                    <span className="font-black text-gray-900 ml-0.5">
                        (O<sub>2</sub>)
                    </span>
                </div>
                <div className="text-2xl font-black flex items-baseline justify-center text-gray-900 font-sans">
                    <span>{o2}</span>
                    <span className="text-xs text-gray-400 ml-1">%</span>
                </div>
            </div>

            {/* ขวา: อัตราเต้นหัวใจ */}
            <div className="flex-1 text-right">
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest font-sans">
                    อัตราเต้นหัวใจ
                </div>
                <div
                    className={`text-sm font-bold uppercase font-sans ${statusColor}`}
                >
                    {statusText}
                </div>
            </div>
        </div>
    )
}

export default Header
