import { useState, useEffect } from "react"

import Card from "../Card/Card"
import vector from '../../assets/vector.svg'
import TCoffee from '../../types/TCoffee'

type TState = {
    loading: boolean,
    error: boolean,
    data?: TCoffee[]
}
export default function Container() {

    const [coffees, setCoffees] = useState<TState>({
        loading: false,
        error: false,
        data: undefined
    })

    const [originalData, setOriginalData] = useState<TCoffee[] | undefined>();
    const [isAllProcuctsShown, setIsAllProductsShown] = useState<boolean>(true);

    useEffect(() => {
        setCoffees({ ...coffees, loading: true })
        fetch(import.meta.env.VITE_API_URL as string)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                return response.json()
            })
            .then(data => {
                setCoffees({ loading: false, error: false, data: data })
                setOriginalData(data);
            })
            .catch(() => {
                setCoffees({ loading: false, error: true, data: undefined })
            })
    }, [])

    function showAllProducts() {
        setCoffees({ ...coffees, data: originalData })
        setIsAllProductsShown(true);
    }

    function showOnlyAvailableProducts() {
        const availableProducts = coffees.data?.filter(coffee => coffee.available)
        setCoffees({ ...coffees, data: availableProducts })
        setIsAllProductsShown(false);
    }

    return (
        <div
            style={{ backgroundImage: `url(${vector})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right -4rem top 3rem' }}
            className="flex flex-col justify-center items-center w-4/5 transform bg-[#1C1D1F] absolute left-1/2 -translate-x-1/2 mt-12 md:mt-24 rounded-xl  px-4 py-20">
            <div className="text-center w-3/4">
                <h1 className="text-white text-2xl font-bold mb-2">Our Collection</h1>
                <p className="text-[#6F757C]">Introducing our Coffee Collection, a selection of unique coffees from different roast types and origins, expertly roasted in small batches and shipped fresh weekly.</p>
            </div>
            <div className="text-white font-bold text-sm flex justify-center gap-1 my-8 mx-auto">
                <button onClick={() => showAllProducts()} className={`${isAllProcuctsShown ? 'bg-[#6F757C]' : ''} hover:bg-[#6F757C] px-4 py-2 rounded-md text-nowrap`}>All Products</button>
                <button onClick={() => showOnlyAvailableProducts()} className={`${!isAllProcuctsShown ? 'bg-[#6F757C]' : ''} hover:bg-[#6F757C] px-4 py-2 rounded-md text-nowrap`}>Available now</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {coffees.loading && <p>Loading...</p>}
                {coffees.error && <p>Something went wrong...</p>}
                {coffees.data && coffees.data.map(coffee => (
                    <Card
                        key={coffee.id}
                        id={coffee.id}
                        available={coffee.available ? coffee.available : false}
                        image={coffee.image}
                        name={coffee.name}
                        popular={coffee.popular}
                        price={coffee.price}
                        rating={coffee.rating}
                        votes={coffee.votes}
                    />
                ))}
            </div>
        </div>
    )
}