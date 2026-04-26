import { useGame } from '../context/GameContext'

const DPad = () => {
    // ดึงฟังก์ชันและ State มาจาก Context
    const { pos, movePlayer, discovered, map, searchRoom } = useGame()

    // เช็กว่าห้องปัจจุบันค้นหาได้ไหม
    const currentRoom = map[`${pos.x},${pos.y}`]
    const canSearch = currentRoom?.type === 'loot' && !currentRoom.searched

    // โครงสร้างปุ่ม 3x3 (N, W, Center, E, S)
    const layout = [
        null,
        { i: 'N', dx: 0, dy: -1 },
        null,
        { i: 'W', dx: -1, dy: 0 },
        { i: 'C' },
        { i: 'E', dx: 1, dy: 0 },
        null,
        { i: 'S', dx: 0, dy: 1 },
        null,
    ]

    return (
        <div className="flex-none bg-white p-4 pb-5 z-10 flex justify-center w-full">
            <div className="grid grid-cols-3 grid-rows-3 gap-2 w-full max-w-60 aspect-square">
                {layout.map((btn, index) => {
                    // ถ้าเป็นช่องว่าง (มุมซ้ายบน ขวาบน ซ้ายล่าง ขวาล่าง)
                    if (!btn) return <div key={index}></div>

                    // ถ้าเป็นปุ่มตรงกลาง (ปุ่มค้นหา)
                    if (btn.i === 'C') {
                        return (
                            <button
                                key={index}
                                onClick={canSearch ? searchRoom : undefined}
                                className={
                                    canSearch
                                        ? 'border border-gray-300 font-bold flex flex-col justify-center items-center transition-transform active:scale-95 select-none bg-gray-50 text-gray-900 shadow-sm rounded-sm hover:bg-gray-100'
                                        : 'flex flex-col justify-center items-center pointer-events-none opacity-20'
                                }
                            >
                                <span className="text-xl font-black font-sans pointer-events-none">
                                    !
                                </span>
                                <span className="text-[8px] font-bold tracking-widest font-sans uppercase mt-0.5 pointer-events-none">
                                    ค้นหา
                                </span>
                            </button>
                        )
                    }

                    // คำนวณพิกัดเป้าหมาย
                    const tx = pos.x + btn.dx
                    const ty = pos.y + btn.dy
                    const isOutOfBounds = tx < 0 || tx > 3 || ty < 0 || ty > 3

                    // ถ้าเป้าหมายทะลุขอบจอ ให้แสดงปุ่มกากบาท X และกดไม่ได้
                    if (isOutOfBounds) {
                        return (
                            <button
                                key={index}
                                disabled
                                className="border border-gray-100 bg-gray-50 text-gray-300 flex justify-center items-center pointer-events-none rounded-sm opacity-50"
                            >
                                <span className="font-sans text-sm font-black">
                                    X
                                </span>
                            </button>
                        )
                    }

                    // ถ้าเดินได้ เช็กว่าเคยไปหรือยังเพื่อเปลี่ยนสีปุ่ม
                    const isKnown = discovered.has(`${tx},${ty}`)
                    const btnClass = `border flex flex-col justify-center items-center transition-all active:scale-95 select-none rounded-sm ${
                        isKnown
                            ? 'border-gray-200 text-gray-400 bg-gray-50 hover:bg-gray-100'
                            : 'border-gray-300 text-gray-900 bg-white font-bold shadow-sm hover:bg-gray-50'
                    }`

                    // ปุ่มทิศทาง N, S, E, W
                    return (
                        <button
                            key={index}
                            className={btnClass}
                            onClick={() => movePlayer(btn.dx, btn.dy)} // สั่งเดิน!
                        >
                            <span className="text-lg font-black font-sans pointer-events-none">
                                {btn.i}
                            </span>
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

export default DPad
