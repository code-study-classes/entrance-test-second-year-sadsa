import hotels from './baseHotels.js';

function changeStatus(htId, numId) {
    const hotel = hotels.find((hotel) => hotel.hotelId === htId);
    const a = hotel.hotelNumbers.find((hotel) => hotel.numberId === numId);
    a.status === 'busy' ? a.status = 'free' : a.status = 'busy';
    console.log(a);
}
changeStatus(1, 2);

function freeNumbers(allHot) {
    const free = allHot.map((item) => {
        return { 
            hotelId: item.hotelId,
            hotelName: item.hotelName,
            region: item.region,
            hotelNumbers: JSON.stringify(item.hotelNumbers.filter((num) => num.status === 'free')) 
        }
    });
    console.log(free);
    
}
freeNumbers(hotels);

function showHotels(hotels) {
    const hotelsDiv = document.querySelector('.hotels');
    hotels.forEach((hotel) => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${hotel.hotelName}</h5>
                    <p class="card-text">Всего ${hotel.hotelNumbers.length} номеров</p>
                    <a href="#" class="btn btn-primary">Показать номера</a>
                </div>
            </div>
        `;
        hotelsDiv.appendChild(div);
    })
}
showHotels(hotels);