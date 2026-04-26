import { useGame } from '../context/GameContext'

const Header = () => {
    const { level, o2 } = useGame()

    // เช็กว่า O2 อยู่ในขั้นวิกฤตหรือไม่
    const isEmergency = o2 <= 20

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
        <div
            className={`p-4 flex w-full items-center flex-none z-10 sm:rounded-t-sm transition-colors duration-500 border-b ${
                isEmergency
                    ? 'emergency-bg border-red-300'
                    : 'bg-gray-50 border-gray-200'
            }`}
        >
            {/* ซ้าย: Deck */}
            <div className="flex-1 text-left">
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest font-sans">
                    Deck
                </div>
                <div
                    className={`text-2xl font-black text-gray-900 font-sans ${isEmergency ? 'text-red-700' : 'text-gray-900'}`}
                >
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
                <div
                    className={`text-2xl font-black flex items-baseline justify-center font-sans ${isEmergency ? 'text-red-600' : 'text-gray-900'}`}
                >
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
