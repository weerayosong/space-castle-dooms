import { createContext, useState, useContext } from 'react'
// **อะไรก็ตามที่คำนวณพร้อมกันได้ใน Event Handler (เช่น ตอนคลิก) ให้ทำตรงนั้นเลย อย่าผลักภาระไปให้ useEffect ช่วยตามเช็กทีหลัง**

// --- 1. ข้อมูลคงที่ (Static Data) ---
const D6 = () => Math.floor(Math.random() * 6) + 1

const ROOMS = {
    START: {
        name: '[ แคปซูลจำศีล ]',
        shape: 'w-16 h-16 border-[3px] border-gray-300 text-gray-400 rotate-45 rounded-sm flex items-center justify-center font-bold text-xs',
        type: 'safe',
    },
    ELEVATOR: {
        name: '[ โถงลิฟต์ ]',
        shape: 'w-16 h-16 border-[3px] border-gray-300 text-gray-400 rounded-sm flex items-center justify-center font-bold text-xl',
        type: 'safe',
        content: '≡',
    },
    EMPTY: {
        name: '[ โถงทางเดิน ]',
        shape: 'w-20 h-20 border border-dashed border-gray-300 rounded-full',
        type: 'safe',
    },
    HAZARD: {
        name: '[ รังเอเลี่ยน ]',
        shape: 'w-16 h-16 border-4 border-double border-red-500 text-red-500 rounded-sm',
        type: 'hazard',
    },
    LOOT: {
        name: '[ ซากความเสียหาย ]',
        shape: 'w-16 h-16 border border-gray-300 bg-gray-50 rounded-sm text-gray-400',
        type: 'loot',
        content: '?',
    },
    EXIT: {
        name: '[ ช่องทางลง ]',
        shape: 'w-16 h-20 bg-gray-900 text-white flex justify-center items-center font-bold rounded-sm shadow-md',
        type: 'exit',
        content: '▼',
    },
}

const DB = {
    firstWakeup: {
        1: () => 'ปวดหัวแทบระเบิด... เกิดอะไรขึ้นกับยาน...',
        2: () => 'ระบบจำศีลถูกยกเลิกงั้นเหรอ...',
        3: () => 'มืดสนิท... พลังงานหลักดับไปตั้งแต่เมื่อไหร่...',
        4: () => 'กลิ่นคาวเลือด... ต้องรีบหาทางหนี!',
        5: () => 'แคปซูลเปิดฉุกเฉิน... ทุกคนหายไปไหนหมด...',
        6: (name) => `ใจเย็นไว้ Lt. ${name}... ต้องรอดไปให้ได้!`,
    },
    wakeup: {
        1: () => 'ทำไมแคปซูลเปิดออกเอง... ฉันหลับไปนานแค่ไหน...',
        2: () => 'ทำไมมันเริ่มใหม่... ฉันตายไปกี่รอบแล้วเนี่ย...',
        3: () => 'กลิ่นคาวเลือด... พวกมันเจาะมาถึงโซนจำศีลแล้ว...',
        4: () => 'ภาพหลอนตอนตาย... มันเหมือนจริงเกินไปแล้ว...',
        5: () => 'ระบบขัดข้อง... ฉันติดอยู่ในวงจรบ้าๆ นี่...',
        6: (name) => `ใจเย็นไว้ Lt. ${name}... รอบนี้ต้องหนีให้พ้น!`,
    },
    ambient: {
        1: 'ไฟกะพริบติดๆ ดับๆ...',
        2: 'ทางเดินเต็มไปด้วยคราบเมือก...',
        3: 'ได้ยินเสียงกรงเล็บขูดลาก...',
        4: 'ฉันต้องรอด...',
        5: 'นั่นเสียงอะไร...',
        6: 'ความเงียบแบบนี้น่ากลัว...',
    },
    loot: {
        1: { msg: <>พลิกศพดู... หลงเหลือแต่เศษเนื้อ</>, o2: 0 },
        2: {
            msg: (
                <>
                    เจอ{' '}
                    <span className="text-gray-900 font-bold border-b border-gray-400">
                        [เสบียงอัดแท่ง]
                    </span>{' '}
                    หมดอายุ
                </>
            ),
            o2: 10,
        },
        3: {
            msg: (
                <>
                    งัดล็อกเกอร์... พบ{' '}
                    <span className="text-gray-900 font-bold border-b border-gray-400">
                        [หน้ากากเก่าๆ]
                    </span>
                </>
            ),
            o2: 15,
        },
        4: {
            msg: (
                <>
                    เปิดกระเป๋าพยาบาล... ได้{' '}
                    <span className="text-gray-900 font-bold border-b border-gray-400">
                        [อะดรีนาลีน]
                    </span>
                </>
            ),
            o2: 25,
        },
        5: {
            msg: (
                <>
                    ล้วงศพ... เจอ{' '}
                    <span className="text-gray-900 font-bold border-b border-gray-400">
                        [ถัง O<sub>2</sub> เล็ก]
                    </span>
                </>
            ),
            o2: 35,
        },
        6: {
            msg: (
                <>
                    แจ็คพอต! พบ{' '}
                    <span className="text-gray-900 font-bold border-b border-gray-400">
                        [แคปซูลพยุงชีพ]
                    </span>
                </>
            ),
            o2: 50,
        },
    },
    hazard: {
        1: {
            seq: [
                'เงาสูงพุ่งทะลุเพดาน!',
                'กรงเล็บมันเจาะชุดฉัน!',
                'เลือดไหลอาบ... คุณหนีออกมา',
            ],
            dmg: 25,
        },
        2: {
            seq: [
                'มันพ่นกรดมรณะใส่!',
                'ชุดหลอมละลายแล้ว!',
                'ปัดกรดออก ถอยร่นมาได้',
            ],
            dmg: 20,
        },
        3: {
            seq: [
                'พื้นยุบตัว ตกสู่รัง!',
                'ปล่อยนะเว้ย!',
                'ยิงพลาสมาสกัด ปีนหนีออกมาได้',
            ],
            dmg: 15,
        },
        4: {
            seq: [
                'ฝูงตัวอ่อนพุ่งเกาะหน้ากาก!',
                'ออกไปให้พ้น!',
                'กระชากมันออก วิ่งหนีไม่คิดชีวิต',
            ],
            dmg: 10,
        },
        5: {
            seq: [
                'หางแหลมฟาดผ่านความมืด!',
                'เฉียดไปนิดเดียว!',
                'รอยถลอกทำให้ O2 รั่วเล็กน้อย',
            ],
            dmg: 5,
        },
        6: {
            seq: [
                'มันพุ่งเข้าใส่!',
                'กินพลาสมาไปซะ!',
                'ยิงสกัด สไลด์หลบเข้าประตูได้ทัน!',
            ],
            dmg: 0,
        },
    },
}

const generateMap = (currentLevel) => {
    let m = {}
    const ex = Math.floor(Math.random() * 2) + 2,
        ey = Math.floor(Math.random() * 2) + 2
    const hazardRate = Math.min(0.2 + currentLevel * 0.02, 0.45)
    const lootRate = Math.max(0.35 - currentLevel * 0.015, 0.2)
    for (let y = 0; y < 4; y++) {
        for (let x = 0; x < 4; x++) {
            if (x === 0 && y === 0)
                m[`${x},${y}`] =
                    currentLevel === 1
                        ? { ...ROOMS.START }
                        : { ...ROOMS.ELEVATOR }
            else if (x === ex && y === ey) m[`${x},${y}`] = { ...ROOMS.EXIT }
            else {
                const r = Math.random()
                if (r < hazardRate) m[`${x},${y}`] = { ...ROOMS.HAZARD }
                else if (r < hazardRate + lootRate)
                    m[`${x},${y}`] = { ...ROOMS.LOOT, searched: false }
                else m[`${x},${y}`] = { ...ROOMS.EMPTY }
            }
        }
    }
    return m
}

// 2. สร้าง Context
const GameContext = createContext()

// 2a. สร้าง Provider (ตัวห่อหุ้มที่จะส่งข้อมูลให้ Component ลูก)
export const GameProvider = ({ children }) => {
    // --- Game States ---
    const [playerName, setPlayerName] = useState('Yosong')
    const [level, setLevel] = useState(1)
    const [o2, setO2] = useState(100)
    const [isDead, setIsDead] = useState(false)
    const [isStarted, setIsStarted] = useState(false)
    const [logs, setLogs] = useState([])

    // --- Game Map States ---
    const [pos, setPos] = useState({ x: 0, y: 0 })
    const [discovered, setDiscovered] = useState(new Set(['0,0']))
    const [map, setMap] = useState({}) // ค่าเริ่มต้นว่างเปล่า จะสร้างตอนกด Start

    // สร้างแผนที่จำลอง 4x4 ชั่วคราวเพื่อให้ UI มีข้อมูลไปแสดงผล
    // const [map, setMap] = useState(() => {
    //     let dummyMap = {}
    //     for (let y = 0; y < 4; y++) {
    //         for (let x = 0; x < 4; x++) {
    //             dummyMap[`${x},${y}`] = {
    //                 name:
    //                     x === 0 && y === 0
    //                         ? '[ แคปซูลจำศีล ]'
    //                         : '[ โถงทางเดิน ]',
    //                 shape:
    //                     x === 0 && y === 0
    //                         ? 'w-16 h-16 border-[3px] border-gray-300 text-gray-400 rotate-45 rounded-sm flex items-center justify-center font-bold text-xs'
    //                         : 'w-20 h-20 border border-dashed border-gray-300 rounded-full',
    //                 type: 'safe',
    //             }
    //         }
    //     }
    //     return dummyMap
    // })

    // ฟังก์ชันพื้นฐานสำหรับเพิ่ม Log
    const addLog = (message) => {
        setLogs((prev) => [message, ...prev].slice(0, 10)) // เก็บแค่ 10 log ล่าสุด
    }

    // --- 3. ฟังก์ชันระบบเกม (Search & Move) ---
    const searchRoom = () => {
        if (isDead || !isStarted) return
        const key = `${pos.x},${pos.y}`
        const room = map[key]

        if (room.type !== 'loot' || room.searched) return

        const costSearch = Math.min(8, 5 + Math.floor(level / 4))
        const roll = D6()
        const result = DB.loot[roll]
        const lootBonus = result.o2 > 0 ? Math.floor(level * 1.5) : 0
        const totalHeal = result.o2 + lootBonus

        // คำนวณ O2 ล่วงหน้า
        const nextO2 = Math.min(100, Math.max(0, o2 - costSearch + totalHeal))
        setO2(nextO2) // อัปเดต O2

        // เช็กว่าตายหรือไม่ ณ ตอนนี้เลย!
        if (nextO2 <= 0 && o2 > 0) {
            setIsDead(true)
            addLog(
                <>
                    ออกซิเจนหมด...{' '}
                    <span className="text-red-600 font-bold">
                        สติสัมปชัญญะดับลง
                    </span>
                </>,
            )
        }

        setMap((prev) => ({
            ...prev,
            [key]: {
                ...room,
                searched: true,
                shape: 'w-16 h-16 border border-dashed border-gray-300 rounded-full',
                content: '',
            },
        }))

        addLog(
            <>
                <span className={roll === 6 ? 'font-bold text-gray-900' : ''}>
                    [SYS.D6 : {roll}] {result.msg}
                    {totalHeal > 0 && (
                        <span className="text-gray-900 font-bold ml-1">
                            (+{totalHeal}%)
                        </span>
                    )}
                </span>
            </>,
        )
    }

    // ฟังก์ชันควบคุมการเดิน
    const movePlayer = (dx, dy) => {
        if (isDead || !isStarted) return // ถ้าตายแล้ว หรือยังไม่เริ่มเกม ห้ามเดิน

        const tx = pos.x + dx
        const ty = pos.y + dy

        // เช็กขอบแผนที่ (กันเหนียว ไม่ให้เดินทะลุกำแพง)
        if (tx < 0 || tx > 3 || ty < 0 || ty > 3) return

        // จะไม่ใช้จะไม่ใช้ dummyMap ละ
        const targetRoom = map[`${tx},${ty}`]
        // คำนวณ O2 ที่ต้องเสีย (ยิ่งลงลึก ยิ่งเหนื่อย)
        const costMove = Math.min(4, 2 + Math.floor(level / 4))
        // ดาเมจจาก data ข้างบน ไว้เล่นต่อ
        let damage = 0

        // ห้องที่เล่นกับค่า damage คือ 'hazard'
        if (targetRoom.type === 'hazard') {
            const roll = D6()
            const outcome = DB.hazard[roll]
            const extraDmg =
                roll === 6 ? 0 : Math.min(15, Math.floor(level * 1.5))
            damage = outcome.dmg + extraDmg

            addLog(
                <>
                    <span className="text-red-600 font-bold">
                        [SYS.D6 : {roll}] {outcome.seq[0]}
                    </span>
                    {damage > 0 && (
                        <span className="text-red-600 font-bold ml-1">
                            (-{damage} O<sub>2</sub>)
                        </span>
                    )}
                </>,
            )

            setTimeout(
                () =>
                    addLog(
                        <span className="italic text-gray-400">
                            {outcome.seq[1]}
                        </span>,
                    ),
                800,
            )
            setTimeout(() => addLog(outcome.seq[2]), 1600)
        } else if (targetRoom.type === 'exit') {
            addLog(
                <>
                    พบช่องทางลง...{' '}
                    <span className="font-bold">
                        (ระบบลงชั้นต่อไป รออัปเดตในเฟสหน้า)
                    </span>
                </>,
            )
        } else {
            if (targetRoom.name === '[ โถงทางเดิน ]') {
                const roll = D6()
                addLog(
                    <span className={roll >= 4 ? 'italic text-gray-400' : ''}>
                        [SYS.D6 : {roll}] {DB.ambient[roll]}
                    </span>,
                )
            } else {
                addLog(`เข้าสู่ ${targetRoom.name}...`)
            }
        }
        // ในเฟส 7 - setO2 >> nextO2
        // คำนวณ O2 ล่วงหน้า
        const nextO2 = Math.max(0, o2 - costMove - damage)
        setO2(nextO2) // อัปเดต O2

        // เช็กความตายทันทีหลังโดนดาเมจ!
        if (nextO2 <= 0 && o2 > 0) {
            setIsDead(true)
            addLog(
                <>
                    ออกซิเจนหมด...{' '}
                    <span className="text-red-600 font-bold">
                        สติสัมปชัญญะดับลง
                    </span>
                </>,
            )
        }

        setPos({ x: tx, y: ty })
        setDiscovered((prev) => new Set(prev).add(`${tx},${ty}`))
    }
    // หัก O2 และเช็กว่าตายไหม
    // setO2((prev) => {
    //     const newO2 = prev - costMove
    //     if (newO2 <= 0) {
    //         setIsDead(true) // สั่งให้สถานะเป็น "ตาย"
    //         addLog(
    //             <>
    //                 ออกซิเจนหมด...{' '}
    //                 <span className="text-red-600 font-bold">
    //                     คุณจะหายใจยังไงล่ะทีนี้ 555
    //                 </span>
    //             </>,
    //         )
    //     }
    //     return Math.max(0, newO2)
    // })

    // // อัปเดตพิกัด
    // setPos({ x: tx, y: ty })

    // // เปิดหมอกใน Minimap (เพิ่มห้องที่เคยเดินผ่าน)
    // setDiscovered((prev) => {
    //     const newSet = new Set(prev)
    //     newSet.add(`${tx},${ty}`)
    //     return newSet
    // })

    // // ลงบันทึก Log
    // const targetRoom = map[`${tx},${ty}`]
    // addLog(
    //     <>
    //         เข้าสู่ {targetRoom.name}{' '}
    //         <span className="text-red-500 font-bold">
    //             (-{costMove} O<sub>2</sub>)
    //         </span>
    //         ,
    //     </>,
    // )

    // รวมข้อมูลและฟังก์ชันที่จะแชร์
    const value = {
        playerName,
        setPlayerName,
        level,
        setLevel,
        o2,
        setO2,
        isDead,
        setIsDead,
        isStarted,
        setIsStarted,
        logs,
        addLog,
        pos,
        setPos,
        discovered,
        setDiscovered,
        map,
        setMap,
        movePlayer,
        // ส่งของเพิ่มออกไปให้ที่อื่นใช้
        searchRoom,
        DB,
        generateMap,
        D6,
    }

    return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

// 3. สร้าง Hook สำหรับดึงข้อมูลไปใช้ง่ายๆ
// เพิ่มคอมเมนต์นี้ไว้ด้านบน export const useGame เพื่อปิดการเตือนเฉพาะจุด
// eslint-disable-next-line react-refresh/only-export-components
export const useGame = () => {
    const context = useContext(GameContext)
    if (!context) {
        throw new Error('useGame must be used within a GameProvider')
    }
    return context
}
