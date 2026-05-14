export default function Title() {
  return (
    <div className="bg-white pt-12 pb-10 px-4 text-center">      
      <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 leading-tight">Хурдан Шуурхай</h1>      
      <h1 className="text-5xl sm:text-6xl font-extrabold text-primary-600 leading-tight mb-4">Амархан</h1>
      <h1 className="text-gray-400 text-base mb-8 max-w-sm mx-auto leading-relaxed">Хамгийн ойрхон, хурдацтай эмийн санг хэдхэн секундэд олоорой</h1>
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-0 bg-white border-2 border-gray-200 rounded-2xl shadow-lg overflow-hidden focus-within:border-primary-400 focus-within:shadow-xl transition-all duration-200">
          <i className="ml-5 text-gray-400 shrink-0">*magnifying glass</i>
          <input type="text" placeholder="Эмийн нэр, шинж тэмдэг хайх..." className="flex-1 px-4 py-4 text-gray-900 text-base bg-transparent outline-none placeholder-gray-400"/>
          <button className="m-2 px-7 py-2.5 bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-white font-semibold text-sm rounded-xl transition-colors shrink-0">Хайх</button>
        </div>
      </div>
      <div className="flex items-center justify-center gap-2 mt-5 flex-wrap">
        <i className="text-gray-400">*arrow up</i>
      </div>
    </div>
  );
}