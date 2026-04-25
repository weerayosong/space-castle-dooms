import React, { createContext, useState, useContext } from 'react'

// 1. สร้าง Context
const GameContext = createContext()

// 2. สร้าง Provider (ตัวห่อหุ้มที่จะส่งข้อมูลให้ Component ลูก)
export const GameProvider = ({ children }) => {
    // --- Game States ---
    const [playerName, setPlayerName] = useState('Yosong')
    const [level, setLevel] = useState(1)
    const [o2, setO2] = useState(100)
    const [pos, setPos] = useState({ x: 0, y: 0 })
    const [isDead, setIsDead] = useState(false)
    const [isStarted, setIsStarted] = useState(false)
    const [logs, setLogs] = useState([])

    // ฟังก์ชันพื้นฐานสำหรับเพิ่ม Log
    const addLog = (message) => {
        setLogs((prev) => [message, ...prev].slice(0, 10)) // เก็บแค่ 10 log ล่าสุด
    }

    // รวมข้อมูลและฟังก์ชันที่จะแชร์
    const value = {
        playerName,
        setPlayerName,
        level,
        setLevel,
        o2,
        setO2,
        pos,
        setPos,
        isDead,
        setIsDead,
        isStarted,
        setIsStarted,
        logs,
        addLog,
    }

    return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

// 3. สร้าง Hook สำหรับดึงข้อมูลไปใช้ง่ายๆ
export const useGame = () => {
    const context = useContext(GameContext)
    if (!context) {
        throw new Error('useGame must be used within a GameProvider')
    }
    return context
}
