import React from 'react'
import Image from 'next/image'

const Placeholder = () => {
  return (
    <div className="w-screen justify-center items-center bg-slate-900 flex flex-col font-[family-name:var(--font-plus-jakarta-sans)] pt-6 md:w-[100%] md:rounded-b-xl lg:w-[50%] xl:rounded-bl-[75px] xl: rounded">
      <Image src='/frontend-mentor-mortgage-calculator/img/illustration-empty.svg' height={200} width={200} alt='empty image'/>
      <p className="text-xl font-bold text-white mb-4">Results shown here</p>
      <p className="text-xs text-white text-center w-60 pb-6 md:w-110 lg:w-[90%]">Complete the form and click “calculate repayments” to see what your monthly repayments would be.</p>
      </div>
  )
}

export default Placeholder