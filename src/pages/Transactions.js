import React, {useEffect, useState} from 'react'
import {Link, useLocation} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'

import Sidebar from "parts/Sidebar"
import formatThousand from "helpers/formatThousand"
import formatDate from "helpers/formatDate"

import order from 'constants/api/orders'

import Loading from 'parts/Loading'

import {statusOrders, fetchOrders, messageOrder} from 'store/actions/orders'
import orders from 'store/reducers/orders'
import Congratulation from 'parts/Congratulation'
import EmptyState from 'parts/EmptyState'

export default function Transactions() {

  const dispatch = useDispatch()
  const ORDERS = useSelector(state => state.orders)

  const location = useLocation()

  const params = location?.search?.length > 0 && location?.search?.substring(1, location.length)?.split?.("&")?.reduce?.( (acc, item) => {
    const [key, value] = item.split("=")
    acc[key] = value
    return acc
  }, {})

  console.log('params => ',params)

  useEffect(() => {
    window.scroll(0,0)

    dispatch(statusOrders("loading"))
    order.all().then( res => {
      dispatch(fetchOrders(res.data))
    }).catch( err => {
      dispatch(messageOrder(err?.response?.data?.message ?? "Error"))
    })
  }, [dispatch])

  // const items = [
  //   {
  //     id: "1",
  //     slug: "2",
  //     image: "https://st4.depositphotos.com/11767332/28754/v/1600/depositphotos_287546302-stock-illustration-financial-transactions-cashless-operation-on.jpg",
  //     name: "Start Vlogging",
  //     levelType: "Beginner",
  //     price: 280000,
  //     date: "2020-01-22",
  //   },
  //   {
  //     id: "2",
  //     slug: "3",
  //     image: "https://thumbs.dreamstime.com/z/online-payment-service-banking-money-transfer-mobile-app-nfc-credit-card-concept-hand-finger-click-send-button-149086812.jpg",
  //     name: "Good Negotiation",
  //     levelType: "Beginner",
  //     price: 580000,
  //     date: "2020-07-22",
  //   }
  // ];

  return (
    <div className="flex">
      <Sidebar></Sidebar>
      <main className="flex-1">
        <div className="px-4 sm:px-16">

        { ORDERS.status === "loading" && <Loading></Loading> }
            { ORDERS.status === "error" && ORDERS.message }
            { ORDERS.status === "ok" && 
                (params.order_id ? <Congratulation data={ORDERS.data[params.order_id]} /> : 
                ORDERS.total > 0 ? 
                <> 
                  <section className="flex flex-col mt-8 pl-12 sm:pl-0">
                    <h1 className="text-xl sm:text-4xl text-gray-900 font-medium">Transactions</h1>
                    <p className="text-sm sm:text-lg text-gray-600">Keep on tract what you've invested</p>
                  </section>
                  <section className="flex flex-wrap flex-col mt-8 mb-8">
                    {
                      Object.values(ORDERS.data)?.map?.( item => {
                        
                        return <div key={item.id} className="flex flex-wrap justify-start items-center -mx-4 mt-5 mb-4 sm:mb-6">
                          <div className="w-full sm:w-1/12 px-4">
                            <img src={item?.metadata?.course_thumbnail ?? ""} alt={item?.metadata?.course_name ?? "Class Name"} />
                          </div>
                          <div className="w-auto sm:w-3/12 px-4">
                            <h6 className="text-gray-900 text-lg">{item?.metadata?.course_name ?? "Class name"}</h6>
                            <p className="text-gray-600">{item?.metadata?.course_level ?? "Level"}</p>
                          </div>
                          <div className="w-full sm:w-2/12 px-4">
                            <h6 className="text-gray-900 text-lg">Rp.{formatThousand(item?.metadata?.course_price ?? 0)}</h6>
                          </div>
                          <div className="w-auto sm:w-2/12 px-4">
                            <h6 className="text-gray-900 text-lg">{item?.created_at ? formatDate(item?.created_at) : "-"}</h6> 
                          </div>
                          <div className="w-3/12 flex justify-center px-4 ml-4 sm:ml-0">
                            {
                              item?.status === "pending" && <Link className="bg-orange-500 hover:bg-orange-400 text-white transition-all duration-200 focus:outline-none px-5 sm:px-6 py-2 sm:py-3 mt-0 sm:mt-4 whitespace-no-wrap"
                               to={`/joined/${item?.course_id}`} style={{whiteSpace:"nowrap"}}> Lunasi </Link>
                            }
                            {
                              item?.status === "success" && <Link className="bg-gray-250 hover:bg-gray-300 transition-all duration-200 focus:outline-none px-5 sm:px-6 py-2 sm:py-3 mt-0 sm:mt-4 whitespace-no-wrap"
                                to={`/courses/${item?.course_id}`} style={{whiteSpace:"nowrap"}}>
                              Lihat Kelas </Link>
                            }
                          </div>
                        </div> 
                      })
                    }
                  </section>
                </> : ( <EmptyState />
            ))}
        </div>
      </main>
    </div>
  )
}
