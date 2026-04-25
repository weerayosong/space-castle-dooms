import React from 'react'
import { useGame } from './context/GameContext' // นำเข้า Hook
import StartScreen from './components/StartScreen'

function App() {
    const { isStarted, o2, playerName } = useGame()

    // ถ้ายังไม่เริ่มเกม (isStarted เป็น false) ให้โชว์หน้า StartScreen
    if (!isStarted) {
        return <StartScreen />
    }

    // ถ้าเริ่มเกมแล้ว (isStarted เป็น true) ให้โชว์หน้าเล่นหลัก
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
                    <h2 className="text-2xl font-black text-red-600 font-inter">
                        MAIN GAME ACTIVE
                    </h2>
                    <p className="mt-4">ยินดีต้อนรับกลับมา, Lt. {playerName}</p>
                    <p className="text-4xl font-black mt-2">{o2}% O2</p>
                </div>
            </div>
        </div>
    )
}

export default App
