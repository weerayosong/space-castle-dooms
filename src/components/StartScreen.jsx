import { useGame } from '../context/GameContext'

const StartScreen = () => {
    const {
        setPlayerName,
        setIsStarted,
        playerName,
        setMap,
        generateMap,
        addLog,
        DB,
        D6,
        checkAchievements,
        loopCount,
    } = useGame()

    // ปรับ handleStart
    const handleStart = () => {
        const finalName = playerName.trim() || 'yosong'
        setPlayerName(finalName)
        setMap(generateMap(1))
        setIsStarted(true)

        addLog(
            <>
                ระบบพยุงชีพ{' '}
                <span className="font-black">
                    (O<sub>2</sub>)
                </span>{' '}
                เปิดทำงาน... ตื่นจากภาวะจำศีล
            </>,
        )

        checkAchievements('GAME_START', {
            name: finalName,
            isLoadSave: loopCount > 1,
        })

        // ทอยเต๋า 1 ครั้งถ้วน แล้วเก็บค่าไว้ในตัวแปร roll
        const roll = D6()

        addLog(
            <span className="italic text-gray-400">
                {/* เรียกใช้ roll ตัวเดียวกันทั้งสองจุด */}
                [SYS.D6 : {roll}] {DB.firstWakeup[roll](finalName)}
            </span>,
        )
    }
    // อย่าลืม! นำเข้า setMap, generateMap, addLog, DB, D6 มาจาก useGame()

    return (
        <div className="absolute inset-0 bg-gray-950 z-50 flex flex-col overflow-hidden fade-in text-gray-100">
            <div className="relative z-20 flex flex-col w-full h-full pt-6 px-5 sm:px-8">
                {/* Lore Area */}
                <div className="flex-1 overflow-y-auto pr-2 mb-6 mt-2">
                    <div className="text-[11px] text-gray-400 leading-relaxed text-left space-y-4 border-l-[3px] border-red-700 pl-4 py-1">
                        <p className="text-red-500 font-bold tracking-widest text-xs uppercase mb-2">
                            INCIDENT REPORT: DAY ???
                        </p>
                        <p>
                            ในฐานะรองหัวหน้าหน่วยรบพิเศษ Space Team
                            คุณสังเกตเห็นความผิดปกติตั้งแต่กระสวยเทียบท่าศูนย์วิจัย
                            "React Castle Room"...
                        </p>
                        <p className="text-gray-500 italic mt-4 text-[10px] tracking-wider border-t border-gray-800 pt-3">
                            [SYS.WARN] พลังงานล้มเหลว... ตัดขาดการเชื่อมต่อ...
                            <br />
                            [SYS.CRYO] บังคับปลุกฉุกเฉิน... คุณลืมตาในความมืด...
                        </p>
                    </div>
                </div>

                {/* Title & Input */}
                <div className="flex-none flex flex-col items-center w-full pb-4">
                    <div className="flex flex-col items-stretch text-white font-black font-inter leading-none text-[2.2rem] sm:text-[2.8rem] w-full max-w-60 mx-auto mb-8">
                        <div className="flex justify-between w-full">
                            <span>S</span>
                            <span>P</span>
                            <span>A</span>
                            <span>C</span>
                            <span>E</span>
                        </div>
                        <div className="flex justify-between w-full">
                            <span>C</span>
                            <span>A</span>
                            <span>S</span>
                            <span>T</span>
                            <span>L</span>
                            <span>E</span>
                        </div>
                        <div className="flex justify-between w-full text-red-600">
                            <span>D</span>
                            <span>O</span>
                            <span>O</span>
                            <span>M</span>
                            <span>S</span>
                        </div>
                    </div>

                    <div className="flex flex-col items-center w-full max-w-60 space-y-3 pb-8">
                        <input
                            type="text"
                            placeholder="..My Name?"
                            maxLength={11}
                            className="w-full bg-gray-900 border border-gray-700 text-gray-100 font-sans font-bold text-center py-3 text-sm uppercase tracking-widest transition-all rounded-sm"
                            onChange={(e) =>
                                setPlayerName(e.target.value.toUpperCase())
                            }
                        />
                        <button
                            onClick={handleStart}
                            className="w-full py-3.5 border border-red-900/50 bg-red-950/40 text-red-500 font-bold uppercase tracking-widest font-sans hover:bg-red-900 hover:text-white transition-colors active:scale-95 text-sm rounded-sm shadow-md"
                        >
                            [ WAKE UP ]
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StartScreen
