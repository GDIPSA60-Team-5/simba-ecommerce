import cartIcon from "@assets/svgs/add-to-cart-icon.svg";

export const AddToCartButton = () => {
    return (
        <button className="bg-black cursor-pointer flex gap-2 px-5 py-2 justify-center items-center text-white hover:bg-black/80">
            Add

            <img src={cartIcon} width={20} alt="" />
        </button>
    );
}