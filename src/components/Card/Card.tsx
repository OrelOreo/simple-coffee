import starFill from '../../assets/Star_fill.svg'
import starEmpty from '../../assets/Star.svg'
import TCoffee from '../../types/TCoffee'

export default function Card({ available, image, name, popular, price, rating, votes }: TCoffee) {

    return (
        <div className="md:min-w-60 rounded overflow-hidden shadow-lg">
            <div className='relative'>
                <img className="w-full h-40 object-cover rounded-lg" src={image} alt="Sunset in the mountains" />
                {popular && <span className="absolute top-2 left-2 bg-[#F6C768] text-xs px-2 py-1 rounded-full">Popular</span>}
            </div>
            <div className="flex justify-between items-center my-2">
                <h3 className='text-white font-bold'>{name}</h3>
                <span className='bg-[#BEE3CC] px-2 py-1 rounded-md text-sm'>{price}</span>
            </div>
            <div className='flex justify-between'>
                <div className='flex items-center'>
                    <img src={rating ? starFill : starEmpty} alt="star" />
                    <span className='text-white mx-1'>{rating}</span>
                    <span className='text-[#6F757C]'>({votes} votes)</span>
                </div>
                <div>
                    {!available && <p className='text-[#ED735D]'>Sold out</p>}
                </div>
            </div>
        </div>
    )
}