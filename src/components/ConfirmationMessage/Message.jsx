import React from "react"
import Food from "../../assets/food.jpg"
import Sleep from "../../assets/sleep.jpg"
import Sport from "../../assets/sport.jpg"
import { useEffect } from "react"
const ConfirmationMessage = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Sahifani yuqoriga qaytaradi
  }, []); // [] - faqat bir marta ishlaydi
  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Confirmation Banner */}
      <div className="bg-green-600 text-white p-6 rounded-lg mb-8 text-center">
        <h2 className="text-xl font-semibold mb-2">Tasdiqlash</h2>
        <p>Sizning ma'lumotlaringiz davolovchi shifokoringizga yuborildi, yaqin orada ular siz bilan bog'lanadi.</p>
      </div>

      {/* Recommendations */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-6">Hozir esa biz sizga quyidagilarni tavsiya qilamiz:</h3>

        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
            <div>
              <h4 className="font-semibold mb-1">Sog'lom turmush tarzi:</h4>
              <p className="text-gray-600">
                Ovqatlanishni muvozanatli qilish, muntazam jismoniy mashqlar bilan shug'ullanish va uyqu rejimini
                nazorat qilish.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
            <div>
              <h4 className="font-semibold mb-1">Profilaktika:</h4>
              <p className="text-gray-600">
                Xavf omillarini kamaytirish (chekishni tashlash, zararli ish sharoitlaridan himoya, allergenlar bilan
                kontaktni cheklash).
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
            <div>
              <h4 className="font-semibold mb-1">Suyuqlik iste'moli:</h4>
              <p className="text-gray-600">
                Harorat va boshqa simptomlarda organizmni yetarli darajada suyuqlik bilan ta'minlash.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
            <div>
              <h4 className="font-semibold mb-1">Vaqtida murojaat qilish:</h4>
              <p className="text-gray-600">
                Yangi simptomlar paydo bo'lsa yoki kasallik xurujli kechsa, darhol shifokorga murojaat qilish.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
            <div>
              <h4 className="font-semibold mb-1">Doimiy monitoring:</h4>
              <p className="text-gray-600">
                Yoshingiz va sog'liq holatingizga mos ravishda muntazam tibbiy ko'riklardan o'tib turish.
              </p>
            </div>
          </div>
        </div>

        {/* Lifestyle Tips */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-6">Sog'lom Turmush Tarzi Maslahatlar</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="rounded-full overflow-hidden w-32 h-32 mx-auto mb-4">
                <img
                  src={Food}
                  alt="Muvozanatli ovqatlanish"
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="font-semibold mb-2">Muvozanatli Ovqatlanish</h4>
              <p className="text-sm text-gray-600">
                Meva-sabzavotlar va to'liq donli mahsulotlarni o'z ichiga olgan muvozanatli ovqatlanishni ta'minlang.
              </p>
            </div>

            <div className="text-center">
              <div className="rounded-full overflow-hidden w-32 h-32 mx-auto mb-4">
                <img
                  src={Sport}
                  alt="Muntazam jismoniy faollik"
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="font-semibold mb-2">Muntazam Jismoniy Faollik</h4>
              <p className="text-sm text-gray-600">
                Har kuni kamida 30 daqiqa o'rtacha jismoniy faollik bilan shug'ullaning.
              </p>
            </div>

            <div className="text-center">
              <div className="rounded-full overflow-hidden w-32 h-32 mx-auto mb-4">
                <img
                  src={Sleep}
                  alt="Yetarli uyqu"
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="font-semibold mb-2">Yetarli Uyqu</h4>
              <p className="text-sm text-gray-600">
                Tanangizning dam olishi va tiklanishi uchun har kuni 7-8 soat sifatli uyquni ta'minlang.
              </p>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 italic">
            Eslatma: Barcha bemorlar uchun individual tavsiyalar va davolash rejasi faqat shifokor tomonidan
            belgilanadi. To'liq tahlil va tashxis qo'yish uchun kerakli hujjatlarni to'ldiring va kerak bo'lsa,
            qo'shimcha tekshiruvlarni amalga oshiring.
          </p>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationMessage

