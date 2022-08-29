interface PopupProps {
    data: Record<any, any>;
}
export default function Popup({data}: PopupProps): JSX.Element {
    return (
        <div className='flex flex-col justify-center items-center space-y-sm'>
            {Object.keys(data).map((key) => (
                <div className='w-full p-base border rounded-md bg-gray-500 font-bold'>
                    <div className='flex justify-between'>
                        <span>{key}</span>
                        <span>{data[key]}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}
