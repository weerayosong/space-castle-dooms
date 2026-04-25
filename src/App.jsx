import { useGame } from './context/GameContext' // นำเข้า Hook
import StartScreen from './components/StartScreen'
import Header from './components/Header'
import Footer from './components/Footer'
import Stage from './components/Stage'
import DPad from './components/DPad'

function App() {
    const { isStarted, logs } = useGame()

    if (!isStarted) {
        return <StartScreen />
    }

    return (
        <div className="flex flex-col w-full max-w-md mx-auto h-full border border-gray-200 bg-white sm:rounded-sm shadow-lg relative overflow-hidden">
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
        </div>
    )
}

export default App
