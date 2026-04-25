const DPad = () => {
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
                                className="flex flex-col justify-center items-center pointer-events-none opacity-20"
                            >
                                {/* อนาคตจะใส่ Logic ให้กด ค้นหาได่ ที่นี่ */}
                                <span className="text-xl font-black font-sans">
                                    !
                                </span>
                            </button>
                        )
                    }

                    // ปุ่มทิศทาง N, S, E, W
                    return (
                        <button
                            key={index}
                            className="border border-gray-300 text-gray-900 bg-white font-bold shadow-sm hover:bg-gray-50 flex flex-col justify-center items-center transition-all active:scale-95 select-none rounded-sm"
                            onClick={() => console.log(`เดินไปทาง ${btn.i}`)} // ตอนนี้กดแล้วให้ log ไปก่อน
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
