'use strict';

/*
 create variables for foolowing elements:
 cartICon
 product(modal) thumbnails
 producut(modal) images
nav--menu
nav---close
minus 
plus
product(modal)btns
#cartAdd
when we click on cartAdd it will create and add an item element on the cart
when we click on the "bin" button it will remove the item.
Initialy the first thumbnail on the products section will be "active" and therefore it's counterpart in the images section will appear.When we click on one of the thumbnails the lightbox(modal) will appear
and the equivalent thumbnail will be "active" and the images corresponding will be displayed in the light box.
When we click on the modal--close button the modal closes and the last "selected" image will be shown on the products section
 */
//variables
const cartICon=document.getElementById('cartIcon');
const cart=document.getElementById('cart');
const links=document.getElementById('links');
const navClose=document.getElementById('navClose');
const modalClose=document.getElementById('modalClose');
const menu=document.getElementById('menu');
const plus=document.getElementById('plus');
const minus=document.getElementById('minus');
const count=document.getElementById('count');
const prodLeft=document.getElementById('prodLeft');
const prodRight=document.getElementById('prodRight');
const modLeft=document.getElementById('modLeft');
const modRight=document.getElementById('modRight');
const cartAdd=document.getElementById('cartAdd');
const price=document.getElementById('price');
const modal=document.getElementById('modal');
const cartCount=document.getElementById('cartCount');
const cartContent=document.getElementById('cartContent');
const productTN=Array.from(document.getElementsByClassName('product--thumbnail'));
const modalTN=Array.from(document.getElementsByClassName('modal--thumbnail'));
const productImages=Array.from(document.getElementsByClassName('product--image'));
const modalImages=Array.from(document.getElementsByClassName('modal--image'));
let index=0;
displayProduct()
let prodName;
let prodPrice;
let prodAmount;
/*We set the initial value of index to zero and invoce the displayProduct function which will have the first thumbnail highlighted and the first image displayed by default.
*/
//Event Listeners
menu.addEventListener('click',function(){
    links.classList.remove('hide')
})
navClose.addEventListener('click',function(){
    links.classList.add('hide')
})
cartICon.addEventListener('mouseenter',function(){
    cart.classList.remove('hide')
})
cartICon.addEventListener('mouseleave',noShow)
cartICon.addEventListener('click',function(){
    cart.classList.remove('hide')
    this.removeEventListener('mouseleave',noShow)
})
cart.addEventListener('mouseleave',function(){
    cart.classList.add('hide');
    cartICon.addEventListener('mouseleave',noShow)
})
productTN.forEach((tn,i,arr)=>{
    tn.addEventListener('click',function(){
        arr.forEach(elm=>elm.classList.remove('highlight'))
        tn.classList.add('highlight');
        index=i;
        displayModal()
    })
})
/*
Once we click on one of the thumbnails the index will be the index of the thumbnail in it's array.The displayModal function will make the lightbox appear.The thumbnail on the lightbox ith the new index will be "active" and the image with the same index will be displayed
*/
modalTN.forEach((tn,i,arr)=>{
    tn.addEventListener('click',function(){
        index=i;
  displayModal()
    })
  
})
/*
When we click on one of the thumbnails on the lightbox it will become highlighted and it's corresponding image will be displayed
*/
modRight.addEventListener('click',function(){
    if(index>=modalTN.length-1)index=-1;
    index++;
    displayModal()
})
modLeft.addEventListener('click',function(){
    if(index<=0)index=modalTN.length;
    index--;
    displayModal()
})
modalClose.addEventListener('click',function(){
    modal.classList.add('hide');
    displayProduct()
})
/*
Once we do all the operations on the lightbox the index will have some value from 0 to 3.When we hit the close button,the lightbox disappears and the displayProudct function gets invoked with the same index.
*/

prodRight.addEventListener('click',function(){
    if(index>=productImages.length-1)index=-1;
    index++;
    displayProductMob()
})
prodLeft.addEventListener('click',function(){
    if(index<=0)index=productImages.length;
    index--;
    displayProductMob()
})
plus.addEventListener('click',function(){
    count.textContent++
})
minus.addEventListener('click',function(){
 count.textContent--
    if(count.textContent<=1)count.textContent=1;
})

cartAdd.addEventListener('click',function(){
    prodName=this.parentElement.querySelector('.product--name').textContent
    prodPrice=this.parentElement.querySelector('.product--price').textContent
    prodAmount=this.parentElement.querySelector('.product--amount').textContent
    cartCount.classList.remove('hide');
    cartCount.textContent++;
  cartContent.classList.remove('noContent');
  const para=document.getElementById('para')
para.classList.add('hide')
const item=construct('div','cart--item');
const cartTn=construct('div','cart--thumbnail',`<img src="images/image-product-1-thumbnail.jpg" alt="product1">`)
const itemInfo=construct('div','cart--info')
const itemName=construct('h3','cart--name',`${prodName}`)
const exp=construct('div','cart--exp');
const itemPrice=construct('span','cart--price',`${prodPrice}`);
const itemAmount=construct('span','cart--amount',` ${prodAmount}`);
const itemTotal=construct('span','cart--total',` $${Number(prodAmount)*Number(prodPrice.replace('$',''))}`);
const itemDel=construct('button','cart--delete',`<img src="images/icon-delete.svg" alt="">`)
const checkOut=construct('button','cart--checkOut','Checkout')
exp.append(itemPrice)
exp.append(' x')
exp.append(itemAmount)
exp.append(itemTotal)
itemInfo.append(itemName)
itemInfo.append(exp)
item.append(cartTn)
item.append(itemInfo)
item.append(itemDel)
cartContent.append(item)

cartContent.appendChild(checkOut)

if(cartContent.contains(checkOut)){
    Array.from(document.getElementsByClassName('cart--checkOut')).forEach((btn,i,arr)=>{
        if(i<arr.length-1)cartContent.removeChild(btn)
    })
}
itemDel.addEventListener('click',function(e){
   const item=this.parentElement;
 cartContent.removeChild(item)
  const items=Array.from(document.getElementsByClassName('cart--item'))
  cartCount.textContent--
  if(items.length===0){
cartContent.classList.add('noContent')
   para.classList.remove('hide')
    cartContent.removeChild(document.querySelector('.cart--checkOut'))
    cartCount.classList.add('hide')
  }
})
})
/*
hitting the cartAdd button will create an "item", but before that we have to get rid of the "cart is empty" text.we will add new elements to the item as well as create the item with the construct function.
clicking on itemDel we delete the parent item.If there are no items in the cart we place the "cart is empty text " back and remoe the checkOut btn as well
*/
//functions
function noShow(){
    cart.classList.add('hide');
    }
function displayProduct(){
   productImages.forEach(image=>image.classList.add('hide')) 
productImages[index].classList.remove('hide');
productTN.forEach(tn=>tn.classList.remove('highlight'))
productTN[index].classList.add('highlight')
}
function displayProductMob(){
     productImages.forEach(image=>image.classList.add('hide')) 
productImages[index].classList.remove('hide');
}
function displayModal(){
    modal.classList.remove('hide')
       modalImages.forEach(image=>image.classList.add('hide')) 
modalImages[index].classList.remove('hide')
modalTN.forEach(tn=>tn.classList.remove('highlight'))
modalTN[index].classList.add('highlight')
}

function construct(elm,className,txt){
const some=document.createElement(elm);
if(className)some.classList.add(className)
if(txt)some.innerHTML=txt
return some
}