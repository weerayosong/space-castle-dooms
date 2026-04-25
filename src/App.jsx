import React from 'react'
import { useGame } from './context/GameContext' // นำเข้า Hook
import StartScreen from './components/StartScreen'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
    const { isStarted } = useGame()

    if (!isStarted) {
        return <StartScreen />
    }

    return (
        <div className="flex flex-col w-full max-w-md mx-auto h-full border border-gray-200 bg-white sm:rounded-sm shadow-lg relative overflow-hidden">
            <Header />

            {/* พื้นที่ตรงกลางสำหรับแสดงแผนที่และ D-Pad */}
            <div className="flex-1 flex flex-col items-center justify-center bg-white p-4">
                <p className="text-gray-400 font-bold tracking-widest animate-pulse">
                    [ พื้นที่รอกราฟิกเกม ]
                </p>
            </div>

            <Footer />
        </div>
    )
}

export default App
