"use client"
import { Slider } from "@/components/ui/slider"
import { useState } from "react";
import { ChartBar } from "./components/BarChart";

export default function Home() {
  const [DA, setDA] = useState<number>(100000)
  const [ROR, setROR] = useState<number>(7)
  const [timePeriod, setTimePeriod] = useState<number>(5)
  const [IP, setIP] = useState<'quarterly' | 'half_yearly' | 'yearly' | 'maturity'>('quarterly')
  const [MA, setMA] = useState<number>(141477.82)
  const [IE, setIE] =useState<number>(41477.82)
  const [chartData, setChartData] = useState([
    { year: "1", interest: 7185 },
    { year: "2", interest: 14888 },
    { year: "3", interest: 23144 },
    { year: "4", interest: 31993 },
    { year: "5", interest: 41478 },
  ])

  interface IP {
    id: 'quarterly' | 'half_yearly' | 'yearly' | 'maturity'
    name: string
  }
  const interestPayoutArr: IP[] = [
    { id: 'quarterly', name: 'Quarterly' },
    { id: 'half_yearly', name: 'Half Yearly' },
    { id: 'yearly', name: 'Yearly' },
    { id: 'maturity', name: 'At Maturity' }
  ]

  const nMap: {
    "quarterly": number
    "half_yearly": number
    "yearly": number
    "maturity": number
  } = {
    "quarterly": 4,
    "half_yearly": 2,
    "yearly": 1,
    "maturity": 1
  }

  function getChatData({p,r,n,t}:{
    p: number
    r: number
    n: number
    t: number
  }){
    const data = []
    for(let y=1; y<=t; y++){
      const yM = p * ((1 + ((r / 100) / n)) ** (n * y))
      const yI = Math.round(yM - p)
      data.push({
        year: `${y}`,
        interest: yI,
      })
    }

    return data
  }


  function calMaturityAmount() {
    let n = nMap[IP]
    let p = DA
    let r = ROR
    let t = timePeriod
    const m = p * ((1 + ((r / 100) / n)) ** (n * t))
    const ie = m < p ? 0 : (m - p)
    setMA(m)
    setIE(ie)

    const cd =  getChatData({p,r,n,t})
    setChartData(cd)
    return m
  }

  return (
    <div className="h-screen w-screen flex p-2 bg-[#e2cfc8]">
      <div className="h-full w-[50%] bg-[#FFFEFF] px-[40px] py-[25px] flex flex-col gap-[50px]">
        {/* FD title */}
        <div>
          <h1 className="text-xl font-bold text-[#C29276]">FD Caculator</h1>
          <p className="text-sm font-light text-[#9AA0A3]">Estimates how much your fixed deposit investment will grow over time.</p>
        </div>

        {/* Deposit */}
        <div className="flex flex-col gap-[20px]">
          <div className="flex justify-between">
            <h2 className="text-xl font-medium text-[#9892A1]">Deposit Amount (₹)</h2>
            <span className="px-[30px] py-[10px] bg-[#F7F7F5] rounded-4xl text-[#797878]">{DA}</span>
          </div>
          <div>
            <Slider value={[DA]} max={5000000} step={100000} min={100000} className="w-full text-red-900" onValueChange={(e) => {
              if(Array.isArray(e)) setDA(e[0] ?? DA)
            }} />
          </div>
          <div className="flex justify-between text-sm font-light text-[#9AA0A3]">
            <span>100000</span>
            <span>2445000</span>
            <span>5000000</span>
          </div>
        </div>

        {/* Rate of return */}
        <div className="flex flex-col gap-[20px]">
          <div className="flex justify-between">
            <h2 className="text-xl font-medium text-[#9892A1]">Rate of return (%)</h2>
            <span className="px-[30px] py-[10px] bg-[#F7F7F5] rounded-4xl text-[#797878]">{ROR}</span>
          </div>
          <div>
            <Slider defaultValue={[5]} max={30} step={1} min={5} className="w-full text-red-900" onValueChange={(e) => {
              if(Array.isArray(e)) setROR(e[0] ?? ROR)
            }} />
          </div>
          <div className="flex justify-between text-sm font-light text-[#9AA0A3]">
            <span>5%</span>
            <span>17.5%</span>
            <span>30%</span>
          </div>
        </div>

        {/* interest payout */}
        <div className="flex justify-between">
          <div>
            <h2 className="text-xl font-medium text-[#9892A1]">Interst Payout</h2>
            <p className="text-sm font-light text-[#9AA0A3]">Cumulative Rate Of Return is <b className="text-green-600">{ROR}%</b></p>
          </div>
          <div className="flex gap-[10px] text-sm font-semibold items-center">
            {interestPayoutArr.map((ele) => {
              return (<button key={ele.id}
                className={`cursor-pointer 
                            ${ele.id === IP ? "bg-[#B28F73]" : "bg-[#EBEBEB]"} ${ele.id !== IP && "hover:bg-[#b5a59e]"}
                            px-[10px] rounded-4xl py-[5px]
                            ${ele.id === IP ? "text-white" : "text-[#B28F73]"} ${ele.id !== IP && "hover:text-white"}`}
                onClick={() => setIP(ele.id)}
              >{ele.name}</button>)
            })}
          </div>
        </div>

        {/* Time period */}
        <div className="flex flex-col gap-[20px]">
          <div className="flex justify-between">
            <h2 className="text-xl font-medium text-[#9892A1]">Time period (Years)</h2>
            <span className="px-[30px] py-[10px] bg-[#F7F7F5] rounded-4xl text-[#797878]">{timePeriod}</span>
          </div>
          <div>
            <Slider defaultValue={[5]} max={50} step={1} min={1} className="w-full text-red-900" onValueChange={(e) => {
              if(Array.isArray(e)) setTimePeriod(e[0] ?? timePeriod)
            }} />
          </div>
          <div className="flex justify-between text-sm font-light text-[#9AA0A3]">
            <span>1</span>
            <span>25</span>
            <span>50</span>
          </div>
        </div>

        {/* Cal button*/}
        <div className="mt-[20px]">
          <button className="px-[30px] py-[10px] rounded-4xl bg-[#B28F73] text-white hover:bg-[#6D4E3A] cursor-pointer"
            onClick={calMaturityAmount}
          >
            Calculate
          </button>
        </div>
      </div>
      <div className="h-full w-[50%] bg-[#D0B39B] px-[40px] py-[25px] flex flex-col gap-[50px]">
        <div className="flex gap-[20%]">
          <div>
            <h2 className="text-lg text-[#EEEDEA] font-medium">Maturity Amount</h2>
            <span className="text-4xl text-white font-extrabold">₹{MA.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
          </div>
          <div>
            <h2 className="text-lg text-[#EEEDEA] font-medium">Interest Earned</h2>
            <span className="text-4xl text-white font-extrabold">₹{IE.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
          </div>
        </div>
        <div>
          <ChartBar chartData={chartData} />
        </div>
      </div>
    </div>
  );
}
