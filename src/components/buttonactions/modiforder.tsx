import Image from "next/image";
import { sizes, extras } from "@/app/data/pizza";
import { useSelector, useDispatch } from "react-redux";
import {
  setIsModalOpen,
  setSelectedPizza,
  setSelectedExtras,
  setTotalPrice,
  setSelectedSize,
  addtocart,
  setopenLastCheckout,
} from "@/store/pizzaSlice";
import { RootState } from "@/store";
import { SizeExtras } from "@/types/pizzatype";
import { toast } from "react-toastify";

const Modiforder = () => {
  const dispatch = useDispatch();
  const {
    isModalOpen,
    selectedPizza,
    selectedExtras,
    totalPrice,
    selectedSize,
  } = useSelector((state: RootState) => state.pizza);

  const closeModal = () => {
    dispatch(setIsModalOpen(false));
    dispatch(setSelectedPizza(null));
  };

  const handleSizeChange = (size: number) => {
    const basePrice = selectedPizza?.price || 0;
    const extrasPrice = selectedExtras.reduce(
      (acc, extra) => acc + extra.value,
      0
    );
    dispatch(setSelectedSize(size));
    dispatch(setTotalPrice(basePrice + extrasPrice + (size - sizes[0].value)));
  };

  const handleExtraChange = (extra: SizeExtras) => {
    const isSelected = selectedExtras.find((e) => e.label === extra.label);
    let updatedExtras;

    if (isSelected) {
      updatedExtras = selectedExtras.filter((e) => e.label !== extra.label);
    } else {
      updatedExtras = [...selectedExtras, extra];
    }

    const basePrice = selectedPizza ? selectedPizza.price : 0;
    const extrasPrice = updatedExtras.reduce((acc, e) => acc + e.value, 0);
    dispatch(setSelectedExtras(updatedExtras));
    dispatch(
      setTotalPrice(basePrice + extrasPrice + (selectedSize - sizes[0].value))
    );
  };

  return (
    <>
      {isModalOpen && selectedPizza && (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md ">
          <div className="bg-white p-6 rounded-lg shadow-2xl w-1/3 relative border-2 border-[#FF5722]">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition shadow-md"
            >
              X
            </button>
            <Image
              src={selectedPizza.image}
              alt={selectedPizza.title}
              width={250}
              height={250}
              className="w-auto h-auto object-cover mx-auto rounded-md shadow-md"
            />
            <h2 className="text-xl font-semibold mb-4 text-black text-center drop-shadow-md">
              {selectedPizza.title}
            </h2>
            <p className="text-center text-black">
              {selectedPizza.description}
            </p>

            <div>
              <p className="text-black font-semibold mb-2">Pick Your Size</p>
              <div className="flex justify-center gap-4 mb-4">
                {sizes.map((size) => (
                  <label key={size.value} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="size"
                      value={size.value}
                      checked={selectedSize === size.value}
                      onChange={() => handleSizeChange(size.value)}
                    />
                    <span className="px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300 transition cursor-pointer shadow-sm">
                      {size.label} $ {selectedPizza.price + size.value}
                    </span>
                  </label>
                ))}
              </div>

              <p className="text-black font-semibold mb-2">Any Extras?</p>
              <div className="flex justify-center gap-4">
                {extras.map((extra) => (
                  <label key={extra.label} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="extra"
                      value={extra.value}
                      checked={selectedExtras.some(
                        (e) => e.label === extra.label
                      )}
                      onChange={() => handleExtraChange(extra)}
                    />
                    <span className="px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300 transition cursor-pointer shadow-sm">
                      {extra.label} (+${extra.value})
                    </span>
                  </label>
                ))}
              </div>
            </div>
            <button
              className="mt-4 px-4 py-2 bg-[#01C550] text-white rounded hover:bg-[#03e06b] transition shadow-md hover:shadow-lg"
         
              onClick={() => {
                closeModal();
                toast.success("Pizza added to cart!", {
                  position: "bottom-left",
                  autoClose: 2000,
                  className: "toast-success",
                });
                dispatch(setSelectedPizza(null));
                dispatch(setopenLastCheckout())
                dispatch(
                  addtocart({
                    pizza: selectedPizza,
                    size: selectedSize,
                    extras: selectedExtras,
                    price: totalPrice,
                    image: selectedPizza.image,
                  })
                );
              }}
            >
              Add to cart - ${totalPrice.toFixed(2)}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modiforder;
