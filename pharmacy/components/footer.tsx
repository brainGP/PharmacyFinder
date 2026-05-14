export default function Footer(){
    return(
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            
            <div>
            <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                    <i className="text-white text-lg">*logo</i>
                </div>
                <h1 className="font-bold text-green-600">Farmacy Finder</h1>
            </div>
            <div className="space-y-2 text-sm text-gray-500">
                <h1 className="flex items-center gap-2"><i className="text-gray-400">*pin</i>Сүхбаатар дүүрэг, Улаанбаатар</h1>
                <h1 className="flex items-center gap-2"><i className="text-gray-400">*telephone</i>+976 9900 1100</h1>
                <h1 className="flex items-center gap-2"><i className="text-gray-400">*mail</i>batorgilerdenebold@gmail.com</h1>
                <h1 className="flex items-center gap-2"><i className="text-gray-400">*mail</i>521yertunts@gmail.com</h1>
            </div>
            </div>

            <div>
            <h1 className="font-semibold text-green-600 mb-4 text-base">Нүүр хуудсууд</h1>
            <ul className="space-y-2 text-sm text-gray-500">
                <li><h1 className="hover:text-green-600 transition-colors cursor-pointer">Нүүр хуудас</h1></li>
                <li><h1 className="hover:text-green-600 transition-colors cursor-pointer">Эмийн сангууд</h1></li>
                <li><h1 className="hover:text-green-600 transition-colors cursor-pointer">Бүтээгдэхүүн</h1></li>
            </ul>
            </div>

            <div>
            <h1 className="font-semibold text-green-600 mb-4 text-base">Эмийн сан</h1>
            <ul className="space-y-2 text-sm text-gray-500">
                <li><h1 className="hover:text-green-600 transition-colors cursor-pointer">Эмийн сан бүртгүүлэх</h1></li>
                <li><h1 className="hover:text-green-600 transition-colors cursor-pointer">Сурталчилах байршил</h1></li>
                <li><h1 className="hover:text-green-600 transition-colors cursor-pointer">Ажилтан авах</h1></li>
            </ul>
            </div>

            <div>
            <h1 className="font-semibold text-green-600 mb-4 text-base">Сошиал сувгууд</h1>
            <div className="flex gap-2">
                <div className="w-8 h-8 rounded-full text-blue-600 bg-blue-50 hover:bg-blue-600 hover:text-white hover:opacity-80 flex items-center justify-center text-xs font-bold cursor-pointer transition">
                fb
                <h1 className="sr-only">Facebook</h1>
                </div>
                <div className="w-8 h-8 rounded-full text-pink-500 bg-pink-50 hover:bg-pink-600 hover:text-white hover:opacity-80 flex items-center justify-center text-xs font-bold cursor-pointer transition">
                ig
                <h1 className="sr-only">Instagram</h1>
                </div>
                <div className="w-8 h-8 rounded-full text-zinc-700 bg-zinc-100 hover:bg-zinc-600 hover:text-white hover:opacity-80 flex items-center justify-center text-xs font-bold cursor-pointer transition">
                x
                <h1 className="sr-only">Twitter</h1>
                </div>
                <div className="w-8 h-8 rounded-full text-red-500 bg-red-50 hover:bg-red-600 hover:text-white hover:opacity-80 flex items-center justify-center text-xs font-bold cursor-pointer transition">
                yt
                <h1 className="sr-only">YouTube</h1>
                </div>
            </div>
            </div>
        </div>
        <div className="border-t border-gray-100 py-4 w-full">
            <p className="text-center text-xs text-gray-400 w-full">
            © 2026 Pharmacy Finder&nbsp;·&nbsp;
            <span className="hover:text-gray-600 cursor-pointer">Terms and Conditions&nbsp;·&nbsp;</span>
            <span className="hover:text-gray-600 cursor-pointer">Privacy Policy</span>
            </p>
        </div>
    </div>
    )
}