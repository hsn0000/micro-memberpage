import React, {useEffect} from 'react'
import Sidebar from "parts/Sidebar"
import formatThousand from "helpers/formatThousand"
import formatDate from "helpers/formatDate"

export default function Transactions() {

  useEffect(() => {
    window.scroll(0,0)
  }, [])

  const items = [
    {
      id: "1",
      slug: "2",
      image: "https://st4.depositphotos.com/11767332/28754/v/1600/depositphotos_287546302-stock-illustration-financial-transactions-cashless-operation-on.jpg",
      name: "Start Vlogging",
      levelType: "Beginner",
      price: 280000,
      date: "2020-01-22",
    },
    {
      id: "2",
      slug: "3",
      image: "https://thumbs.dreamstime.com/z/online-payment-service-banking-money-transfer-mobile-app-nfc-credit-card-concept-hand-finger-click-send-button-149086812.jpg",
      name: "Good Negotiation",
      levelType: "Beginner",
      price: 580000,
      date: "2020-07-22",
    }
  ];

  return (
    <div className="flex">
      <Sidebar></Sidebar>
      <main className="flex-1">
        <div className="px-16">
          <section className="flex flex-col mt-8">
            <h1 className="text-4xl text-gray-900 font-medium">Transactions</h1>
            <p className="text-lg text-gray-600">Keep on tract what you've invested</p>
          </section>
          <section className="flex flex-col mt-8">
            {
              items?.length > 0 ? items.map( item => {
                return <div key={item.id} className="flex justify-start items-center -mx-4 mt-5">
                  <div className="w-auto px-4" style={{ width: 150 }}>
                    <img src={item?.image ?? ""} alt={item?.name ?? "Class Name"} />
                  </div>
                  <div className="w-3/12 px-4">
                    <h6 className="text-gray-900 text-lg">{item?.name ?? "Class name"}</h6>
                    <p className="text-gray-600">{item?.levelType ?? "Level"}</p>
                  </div>
                  <div className="w-2/12 px-4">
                    <h6 className="text-gray-900 text-lg">Rp.{formatThousand(item?.price ?? 0)}</h6>
                  </div>
                  <div className="w-2/12 px-4">
                    <h6 className="text-gray-900 text-lg">{item?.date ? formatDate(item?.date) : "-"}</h6> 
                  </div>
                  <div className="w-auto px-4">
                    <button
                      className="bg-gray-250 hover:bg-gray-300 transition-all duration-200 focus:outline-none text-white px-6 py-3 mt-4">
                      Lihat Kelas
                    </button>
                  </div>
                </div> 
              }) : "No Transaction"
            }
          </section>
        </div>
      </main>
    </div>
  )
}
