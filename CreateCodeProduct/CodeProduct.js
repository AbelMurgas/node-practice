const data = ["Caballero Zapato", "Caballero Chaleco", "Hogar Abanico", "Damas tacones"]
const createProduct = (listData) => listData.map((data,index) => {
    const [deparment, produt] = data.split(" ");
    const indexWithCero = String(index+1).padStart(3, '0')
    return deparment.charAt(0).toUpperCase() + produt.charAt(0).toUpperCase() + indexWithCero
})  
console.log(createProduct(data))