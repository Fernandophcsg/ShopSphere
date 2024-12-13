import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"


const HomeSlider = () => {
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((currentStep) => (currentStep + 1) % 3)
    }, 5000)

    return () => clearInterval(interval)
  }, [currentStep])

  return (
    <AnimatePresence mode="wait" >
    {
      currentStep === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          key= "slider1"
        className=" absolute top-0 left-0 w-full h-[18rem] bg-slider1 bg-cover bg-center pt-10 px-20 ">
          <div className="grid gap-2">
            <motion.h2
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 1 }}
            key= "slider1"
            className="text-slate-100 w-max">01Oct - 31Oct</motion.h2>
            <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 1, delay: 0.5 }}
            key= "slider1"
            className="text-5xl mb-2 font-bold font-sans text-slate-100 w-max" >#FASHION DAY</motion.h1>
             <motion.h2
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 1, delay: 1 }}
            key= "slider1"
            className="text-slate-100 w-max">Descover fashion that suits to your style</motion.h2>
          </div>
        </motion.div>
      )
    }
    {
      currentStep === 1 && (
        <motion.div
        initial={{ opacity: 0, width: 0,height:'18rem' }}
          animate={{ opacity: 1, width: "100%",height:'18rem' }}
          exit={{ opacity: 0, width: 0,height:'18rem' }}
          transition={{ duration: 1 }}
          key= "slider2"
        className=" absolute top-0 left-0 w-full h-[18rem] bg-slider2 bg-cover bg-center pt-10 px-20 ">
          <div className="grid gap-2">
          <motion.h2
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 1 }}
            key= "slider2"
            className="text-slate-900 w-max">01Oct - 31Oct</motion.h2>
            <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 1, delay: 0.5 }}
            key= "slider2"
            className="text-5xl mb-2 font-bold font-sans text-slate-500 w-max" >#FASHION DAY</motion.h1>
            <motion.h2
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 1, delay: 1 }}
            key= "slider2"
            className="text-slate-900 w-max">Descover fashion that suits to your style</motion.h2>
          </div>
        </motion.div>
      )
    }
    {
      currentStep === 2 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "18rem" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 1 }}
          key= "slider3"
        className=" absolute top-0 left-0 w-full h-[18rem] bg-slider3 bg-cover bg-center pt-10 px-20 ">
          <div className="grid gap-2">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 1 }}
            key= "slider3"
            className="text-slate-900 w-max">01Oct - 31Oct</motion.h2>
            <motion.h1
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 1, delay: 0.5 }}
            key= "slider3"
            className="text-5xl mb-2 font-bold font-sans text-slate-900 w-max" >#FASHION DAY</motion.h1>
            <motion.h2
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 1, delay: 1 }}
            key= "slider3"
            className="text-slate-900 w-max">Descover fashion that suits to your style</motion.h2>
          </div>
        </motion.div>
      )
    }
    </AnimatePresence>
  )
}

export default HomeSlider