const hotels = [
    { 
        hotelId: 1,
        hotelName: 'North',
        region: 'Tyumen',
        hotelNumbers: [
            { hotelNumber: '111', category: 'luxe', places: 2, status: 'free', numberId: 1 },
            { hotelNumber: '222', category: 'standart', places: 2, status: 'free', numberId: 2 },
            { hotelNumber: '333', category: 'apparts', places: 4, status: 'free', numberId: 3 },
            { hotelNumber: '444', category: 'luxe', places: 2, status: 'free', numberId: 4 },
            { hotelNumber: '555', category: 'standart', places: 2, status: 'free', numberId: 5 },
        ]
    },
    {
        hotelId: 2,
        hotelName: 'Piter',
        region: 'SPB',
        hotelNumbers: [
            { hotelNumber: '11', category: 'luxe', places: 2, status: 'free', numberId: 1 },
            { hotelNumber: '33', category: 'standart', places: 2, status: 'free', numberId: 2 },
            { hotelNumber: '55', category: 'apparts', places: 4, status: 'busy', numberId: 3 },
            { hotelNumber: '77', category: 'luxe', places: 2, status: 'free', numberId: 4 },
            { hotelNumber: '99', category: 'standart', places: 2, status: 'busy', numberId: 5 },
        ]
    },
    {
        hotelId: 3,
        hotelName: 'Center',
        region: 'Moscow',
        hotelNumbers: [
            { hotelNumber: '15', category: 'luxe', places: 2, status: 'free', numberId: 1 },
            { hotelNumber: '228', category: 'standart', places: 2, status: 'busy', numberId: 2 },
            { hotelNumber: '147', category: 'apparts', places: 4, status: 'free', numberId: 3 },
            { hotelNumber: '11', category: 'luxe', places: 2, status: 'busy', numberId: 4 },
            { hotelNumber: '22', category: 'standart', places: 2, status: 'free', numberId: 5 },
        ]
    }
]
export default hotels;