import { useGame } from './context/GameContext' // นำเข้า Hook

function App() {
    const { o2, playerName } = useGame()

    return (
        <div className="flex flex-col w-full max-w-md mx-auto h-full border border-gray-200 bg-white sm:rounded-sm shadow-lg relative overflow-hidden">
            <div className="p-4 text-center">
                <h1 className="text-xl font-black font-inter">
                    SPACE CASTLE DOOMS
                </h1>
                <p className="text-sm font-sans">ผู้เล่น: {playerName}</p>
                <div className="mt-4 p-4 border border-red-200">
                    <p className="text-xs uppercase font-bold text-gray-500">
                        ระบบพยุงชีพ (O2)
                    </p>
                    <p className="text-4xl font-black">{o2}%</p>
                </div>
            </div>
        </div>
    )
}

export default App
