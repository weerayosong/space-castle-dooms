import { useGame } from './context/GameContext' // นำเข้า Hook
import StartScreen from './components/StartScreen'
import Header from './components/Header'
import Footer from './components/Footer'
import Stage from './components/Stage'
import DPad from './components/DPad'

function App() {
    const {
        isStarted,
        logs,
        isDead,
        playerName,
        setO2,
        setIsDead,
        setPos,
        setDiscovered,
        addLog,
    } = useGame()

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

    if (!isStarted) {
        return <StartScreen />
    }

    return (
        <div className="flex flex-col w-full max-w-md mx-auto h-full border border-gray-200 bg-white sm:rounded-sm shadow-lg relative overflow-hidden">
            {/* ... Header, Stage, Logs, DPad, Footer ... */}

            <Header />

            {/* พื้นที่แสดง Minimap และห้อง */}
            <Stage />

            {/* พื้นที่แสดงข้อความแจ้งเตือน (Logs) */}
            <div className="h-32 sm:h-36 flex-none bg-gray-50 border-y border-gray-200 p-4 overflow-y-auto text-[11.5px] leading-relaxed tracking-wide z-10 font-sans text-gray-600 flex flex-col-reverse">
                <div>
                    {logs.map((log, index) => (
                        <div
                            key={index}
                            className="mb-2 pb-1 border-b border-gray-200 border-dashed flex items-start"
                        >
                            <span className="text-gray-400 mr-2">&gt;</span>

                            {/* refactor (String HTML" มาเป็นการส่ง "React Component) */}
                            {/* <span className="flex-1" dangerouslySetInnerHTML={{ __html: log }}></span> */}
                            <span className="flex-1">{log}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* ปุ่มกดทิศทาง */}
            <DPad />

            <Footer />
            {/* ---- หน้าจอ Fatal Error (ทำงานเมื่อ isDead เป็น true) ---- */}
            {isDead && (
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
            )}
        </div>
    )
}

export default App
