export default function Advantage() {
  return (
    <div className="bg-gray-50 py-16 border-t border-gray-100">
      <div className="max-w-5xl mx-auto px-4 text-center">
        
        <h1 className="text-2xl font-bold text-gray-900 mb-10">Бидний давуу тал</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 bg-green-100 text-green-600">
              <i className="text-2xl">*magnifying glass</i>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Бодит цагийн хайлт</h3>
            <p className="text-sm text-gray-500 leading-relaxed">Шуурхай хайлт, хэдхэн секундэд үр дүн гарна. Ямар ч эм, ямар ч шинж тэмдэг.</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 bg-blue-100 text-blue-600">
              <i className="text-2xl">*pin</i>
            </div>
            <h1 className="font-semibold text-gray-900 mb-2">Тодорхой байршил</h1>
            <h1 className="text-sm text-gray-500 leading-relaxed">GPS байршил ашиглан хамгийн ойрхон эмийн санг газрын зураг дээр шууд харна.</h1>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 bg-orange-100 text-orange-600">
              <i className="text-2xl">*clock</i>
            </div>
            <h1 className="font-semibold text-gray-900 mb-2">Цагийн хуваарь</h1>
            <h1 className="text-sm text-gray-500 leading-relaxed">24/7 хайлт боломжтой. Шөнийн цагт ч нээлттэй эмийн санг хурдан олоорой.</h1>
          </div> 
        </div>

      </div>
    </div>
  );
}