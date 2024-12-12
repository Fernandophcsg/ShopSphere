

const TypicalButton = ({type,color}:{type:string,color:string}) => {
  return (
    <button 
      style={{backgroundColor: color}}
      className="w-max px-10 py-4 rounded-lg opacity-85 text-white text-md">
        {type}
    </button>
  )
}

export default TypicalButton