

const ProductAddButton =({handleOpen}:{handleOpen:(value:boolean)=>void}) => {
  return (
    <div
      onClick={() => handleOpen(true)}
      className="bg-customGreen text-white fixed right-10 bottom-10 p-4 rounded-full z-50 cursor-pointer"
    >
      Add Product
    </div>
  );
};

export default ProductAddButton;
