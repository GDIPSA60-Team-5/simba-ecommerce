
Added cart entity

Added CartItemRepository



Corrected CartRepository, From <CartItem, Integer> to <Cart, Integer>

Added private cart cart into cartItem entity. and cart setter and getter.

In CartServiceImpl Class:
Added addtocart, reduceProductQuantity and removeProductFromCart methods.

Added @Autowired  
CartItemRepository cartItemRepo;

Adjusted:
public CartItem updateCartOrderQty(CartItem cartItem) {
		return cartRepo.save(cartItem);
to:
public CartItem updateCartOrderQty(CartItem cartItem) {
		return cartItemRepo.save(cartItem);

In CartController, 
added the methods for addToCart, reduceProductQuantity, removeProductFromCart. 

In CartService, added the methods for addToCart, reduceProductQuantity,
removeProductFromCart.
 
