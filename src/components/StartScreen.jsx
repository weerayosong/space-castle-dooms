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
            <div className="container mx-auto relative z-20 flex flex-col w-full md:max-w-125 h-dvh pt-6 px-5 sm:px-8">
                {/* Lore Area */}
                <div className="flex-1 overflow-y-auto pr-2 mt-2">
                    <div className="text-sm text-gray-400 leading-relaxed text-left space-y-4 border-l-[3px] border-red-700 pl-4 py-1">
                        <p className="text-red-500 font-bold tracking-widest text-sm font-sans uppercase mb-2">
                            INCIDENT REPORT: DAY ??? (UNKNOWN CYCLE)
                        </p>
                        <p>
                            ในฐานะรองหัวหน้าหน่วยรบพิเศษ Space Team
                            คุณสังเกตเห็นความผิดปกติตั้งแต่กระสวยเทียบท่าศูนย์วิจัย
                            "React Castle Room" คุณพยายามทักท้วงเรื่องนี้แล้ว
                            แต่
                            <span className="text-gray-300 font-bold ml-1 mr-1">
                                Cpt.Pika
                            </span>
                            กลับมองข้ามสัญชาตญาณของคุณ
                        </p>
                        <p>
                            ภารกิจกู้ภัย
                            <span className="text-gray-300 font-bold ml-1 mr-1">
                                Sgt.Mew
                            </span>
                            ดูเหมือนจะสำเร็จลุล่วง
                            ทว่าความจริงถูกปกปิดไว้เป็นความลับระดับสูงสุด
                            เขาไม่ได้ติดกับดัก แต่ถูกสั่ง "กักตัวแบบแน่นหนา"
                            เพราะเขาได้รับเชื้อพาหะมรณะจากภารกิจก่อนหน้าติดตัวมาด้วย
                        </p>
                        <p>
                            หลังพาทีมกลับขึ้นยานแม่ 'Space Castle'
                            คุณหมดหน้าที่และต้องเข้าสู่สภาวะจำศีล (Cryo-sleep)
                            ตามระเบียบปฏิบัติ โดยไม่รู้เลยว่า
                            นั่นคือครั้งสุดท้ายที่คุณจะได้เห็นยานในสภาพปกติ
                        </p>
                        <p>
                            สเปซคาสเซิลเป็นยานอวกาศขนาดมหึมา
                            การฟักตัวของพาหะค่อยๆ
                            เกิดขึ้นอย่างเงียบเชียบในเงามืด
                            ลูกเรือเริ่มหายตัวไปอย่างเป็นปริศนาทีละคน
                            จากสัญชาตญาณดิบดั่งสัตว์เดรัจฉาน
                            พวกมันเรียนรู้ที่จะตัดท่อหล่อเย็นและสายเคเบิลพลังงานหลักเพื่อสร้างรัง
                            (Hive)
                        </p>
                        <p>
                            กว่าระบบรักษาความปลอดภัยจะทำงาน
                            ยานทั้งลำก็ถูกกลืนกินไปเสียแล้ว
                            ปืนพลาสมาและระเบิดพลังงานของหน่วยรบไม่อาจต้านทานฝูงมฤตยู
                            ยานถูกล็อกดาวน์โดยสมบูรณ์
                            ทิ้งให้คุณหลับใหลอยู่เบื้องหลังความวิบัติ
                        </p>
                        <p className="text-gray-200 italic mt-4 text-xs font-sans tracking-wider border-t border-gray-800 pt-3">
                            [SYS.WARN] พลังงานล้มเหลว... ตัดขาดการเชื่อมต่อ...
                            <br />
                            [SYS.CRYO] บังคับปลุกฉุกเฉิน... คุณลืมตาในความมืด...
                        </p>
                    </div>
                </div>

                {/* Title & Input */}
                <div className="flex-none flex flex-col items-center w-full pb-4">
                    <div className="flex flex-col items-stretch text-white font-black font-inter leading-none text-[3.6rem] sm:text-[3.6rem] w-full max-w-60 mx-auto mb-2">
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

                    <div className="flex flex-col items-center w-full max-w-60 space-y-2">
                        <input
                            type="text"
                            placeholder="..What? ..My Name?"
                            maxLength={11}
                            className="w-full bg-zinc-300 border border-red-500 text-red-500 font-mono font-bold italic text-center py-1 text-xs tracking-widest transition-all rounded-sm uppercase"
                            onChange={(e) =>
                                setPlayerName(e.target.value.toUpperCase())
                            }
                        />
                        <button
                            onClick={handleStart}
                            className="w-full py-2 border border-red-900/50 bg-red-950/40 text-red-500 font-bold uppercase tracking-widest font-sans hover:bg-red-900 hover:text-white transition-colors active:scale-95 text-sm rounded-sm shadow-md"
                        >
                            [ WAKE UP ]
                        </button>
                    </div>
                </div>
                <div className="flex-none pt-4 pb-4 text-center text-xs text-gray-600 font-sans tracking-widest border-t border-gray-900/50">
                    COPYRIGHT &copy; 2026 YOSONG.DEV
                </div>
            </div>
        </div>
    )
}

export default StartScreen
